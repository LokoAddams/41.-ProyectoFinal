import { useState, useMemo, useEffect } from 'react';
import { api as axios } from '../../services/api';
import { Helmet } from 'react-helmet-async';
import styles from './DashboardCrud.module.scss';
import { useAuth } from '../../context/AuthContext';
import { getUserRole, logout as authLogout } from '../../utils/auth';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../../components/Input/Input';
import type { Product } from '../../interfaces';

export const DashboardCrud = () => {
  const { user, logout: contextLogout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const isAdmin = getUserRole() === 'ADMIN';

  useEffect(() => {
    axios.get('/coffees')
      .then(res => setProducts(res.data))
      .catch(() => { /* error handling */ });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [newIngredient, setNewIngredient] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [alertConfig, setAlertConfig] = useState<{isOpen: boolean, type: 'success'|'error'|'confirm', message: string, title?: string, onConfirm?: () => void}>({ isOpen: false, type: 'success', message: '' });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const showAlert = (type: 'success'|'error'|'confirm', message: string, title?: string, onConfirm?: () => void) => {
    setAlertConfig({ isOpen: true, type, message, title, onConfirm });
  };

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const categories = useMemo(() => {
    const allIngredients = products.flatMap(p => p.ingredients || []);
    return Array.from(new Set(allIngredients)).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? p.ingredients.includes(selectedCategory) : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);
  }, [products, searchQuery]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct({ ingredients: [], title: '', description: '', image: '' });
    }
    setFormErrors({});
    setTouched({});
    setHasSubmitted(false);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    showAlert('confirm', '¿Estás seguro de que quieres eliminar este producto?', 'Confirmar eliminación', () => {
      axios.delete(`/coffees/${id}`)
        .then(() => {
          setProducts(products.filter(p => p.id !== id));
          showAlert('success', 'Producto eliminado correctamente', 'Éxito');
        })
        .catch(() => {
          showAlert('error', 'Hubo un error al eliminar el producto', 'Error');
        });
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!editingProduct.title || editingProduct.title.length < 2 || editingProduct.title.length > 100) {
      errors.title = 'El título debe tener entre 2 y 100 caracteres';
    }
    if (!editingProduct.description || editingProduct.description.length < 10 || editingProduct.description.length > 500) {
      errors.description = 'La descripción debe tener entre 10 y 500 caracteres';
    }
    if (!editingProduct.image || !/^(http|https):\/\//.test(editingProduct.image)) {
      errors.image = 'La imagen debe ser una URL válida que empiece por http:// o https://';
    }
    if (!editingProduct.ingredients || editingProduct.ingredients.length === 0) {
      errors.ingredients = 'Debe haber al menos un ingrediente';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validación en tiempo real cuando el usuario edita
  useEffect(() => {
    validateForm();
  }, [editingProduct]);

  const handleSaveProduct = () => {
    setHasSubmitted(true);
    if (!validateForm()) {
      showAlert('error', 'Por favor, corrige los errores del formulario antes de continuar.', 'Error de Validación');
      return;
    }
    
    const request = editingProduct.id
      ? axios.put(`/coffees/${editingProduct.id}`, editingProduct)
      : axios.post('/coffees', editingProduct);

    request
      .then(res => {
        if (editingProduct.id) {
          setProducts(products.map(p => p.id === editingProduct.id ? res.data : p));
          showAlert('success', 'Producto actualizado correctamente.', 'Éxito');
        } else {
          setProducts([...products, res.data]);
          showAlert('success', 'Producto creado correctamente.', 'Éxito');
        }
        setIsModalOpen(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data) {
          setFormErrors(error.response.data);
          showAlert('error', 'El servidor rechazó los datos. Revisa los errores.', 'Error de Validación');
        } else {
          showAlert('error', 'Hubo un error de red al guardar el producto.', 'Error');
        }
      });
  };

  const handleAddIngredient = () => {
    if (newIngredient && editingProduct.ingredients) {
      setEditingProduct({
        ...editingProduct,
        ingredients: [...editingProduct.ingredients, newIngredient]
      });
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (ingToRemove: string) => {
    if (editingProduct.ingredients) {
      setEditingProduct({
        ...editingProduct,
        ingredients: editingProduct.ingredients.filter(ing => ing !== ingToRemove)
      });
    }
  };

  const getInitials = (name: string) => name ? name.substring(0, 2).toUpperCase() : 'U';

  return (
    <>
      <Helmet>
        <title>Dashboard - Artisan Roasts</title>
      </Helmet>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.brand}>
            <span className="material-symbols-outlined" aria-hidden="true">coffee</span>
            <span>Artisan Roasts</span>
          </div>
          <nav className={styles.nav}>
            <a href="#" className={styles.navLinkActive} onClick={() => setIsSidebarOpen(false)}>
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span> Dashboard
            </a>
          </nav>
          <div className={styles.bottomNav}>
            <button className={styles.navLink} style={{ marginBottom: '0.5rem', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }} onClick={() => { setIsSidebarOpen(false); setIsHelpModalOpen(true); }}>
              <span className="material-symbols-outlined" aria-hidden="true">help</span> Ayuda
            </button>
            <button className={styles.logoutBtn} onClick={() => { authLogout(); contextLogout(); setIsSidebarOpen(false); }}>
              <span className="material-symbols-outlined" aria-hidden="true">logout</span> Cerrar Sesión
            </button>
          </div>
        </aside>

        <main className={styles.mainContent}>
          {/* Top Header */}
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>Management</h1>

            <div className={styles.searchWrapper}>
              <div className={styles.searchInputWrapper}>
                <span className={`material-symbols-outlined ${styles.searchIcon}`} aria-hidden="true">search</span>
                <input
                  type="text"
                  placeholder="Search coffee products..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
              </div>

              {showSuggestions && searchSuggestions.length > 0 && (
                <div className={styles.autocomplete}>
                  <div className={styles.autocompleteHeader}>Suggestions</div>
                  {searchSuggestions.map(s => (
                    <button
                      key={s.id}
                      className={styles.suggestionItem}
                      onClick={() => {
                        setSearchQuery(s.title);
                        setShowSuggestions(false);
                      }}
                    >
                      <span>{s.title}</span>
                      <span className="material-symbols-outlined" aria-hidden="true">north_west</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.headerActions}>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="Alternar modo oscuro"
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit', marginRight: '0.5rem' }}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              {isAdmin && (
                <Button icon="add" iconPosition="left" onClick={() => handleOpenModal()}>
                  Crear Nuevo
                </Button>
              )}
              <div className={styles.avatar}>{getInitials(user?.name || '')}</div>

              {/* Mobile Sidebar Toggle */}
              <button
                className={styles.sidebarToggle}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Abrir menú lateral"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {isSidebarOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </header>

          <section className={styles.content}>
            {/* Filters */}
            <div className={styles.filters}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1.25rem' }}>sort</span>
                Filtrar por:
              </span>
              <button
                className={`${styles.filterBtn} ${!selectedCategory ? styles.activeFilter : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilter : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className={styles.grid}>
              {filteredProducts.map(product => (
                <div key={product.id} className={styles.card}>
                  {isAdmin && (
                    <div className={styles.cardActions}>
                      <button className={styles.actionBtn} onClick={() => handleOpenModal(product)} aria-label="Editar producto">
                        <span className="material-symbols-outlined" aria-hidden="true">edit</span>
                      </button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(product.id)} aria-label="Eliminar producto">
                        <span className="material-symbols-outlined" aria-hidden="true">delete</span>
                      </button>
                    </div>
                  )}

                  <div className={styles.imageWrapper}>
                    <img src={product.image} alt={product.description} width="200" height="200" loading="lazy" />
                  </div>

                  <div className={styles.cardInfo}>
                    <div className={styles.cardHeader}>
                      <h2>{product.title}</h2>
                    </div>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.tags}>
                      {product.ingredients.map(ing => (
                        <span key={ing} className={styles.tag}>{ing}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.emptyState}>
                <span className="material-symbols-outlined" aria-hidden="true">search_off</span>
                <p>No se encontraron productos.</p>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Modal CRUD */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct.id ? "Editar Producto" : "Crear Producto"}
        subtitle={editingProduct.id ? `ID: #${editingProduct.id}` : "Nuevo Ingreso"}
        footer={
          <>
            <Button variant="outline" fullWidth onClick={() => setIsModalOpen(false)}>Descartar</Button>
            <Button variant="primary" fullWidth onClick={handleSaveProduct} isDisabled={Object.keys(formErrors).length > 0}>Guardar Cambios</Button>
          </>
        }
      >
        <div className={styles.formGroup}>
          <Input
            label="Product Title *"
            value={editingProduct.title || ''}
            onChange={e => {
              setTouched(prev => ({ ...prev, title: true }));
              setEditingProduct({ ...editingProduct, title: e.target.value });
            }}
            error={(touched.title || hasSubmitted) ? formErrors.title : undefined}
          />
          
          <Input
            label="Image URL *"
            icon="link"
            value={editingProduct.image || ''}
            onChange={e => {
              setTouched(prev => ({ ...prev, image: true }));
              setEditingProduct({ ...editingProduct, image: e.target.value });
            }}
            error={(touched.image || hasSubmitted) ? formErrors.image : undefined}
          />

          <div className={styles.inputGroup}>
            <label>Description *</label>
            <textarea
              rows={4}
              value={editingProduct.description || ''}
              onChange={e => {
                setTouched(prev => ({ ...prev, description: true }));
                setEditingProduct({ ...editingProduct, description: e.target.value });
              }}
              className={styles.textarea}
              style={(touched.description || hasSubmitted) && formErrors.description ? { borderColor: '#ef4444' } : {}}
            />
            {(touched.description || hasSubmitted) && formErrors.description && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.description}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Ingredients *</label>
            <div className={styles.ingredientTags} style={(touched.ingredients || hasSubmitted) && formErrors.ingredients ? { borderColor: '#ef4444', padding: '0.5rem', border: '1px dashed #ef4444', borderRadius: '4px' } : {}}>
              {editingProduct.ingredients?.map(ing => (
                <div key={ing} className={styles.ingredientTag}>
                  {ing}
                  <button aria-label="Eliminar ingrediente" onClick={() => {
                    setTouched(prev => ({ ...prev, ingredients: true }));
                    handleRemoveIngredient(ing);
                  }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', marginLeft: '0.5rem', color: 'inherit' }}>
                    <span className="material-symbols-outlined" aria-hidden="true">close</span>
                  </button>
                </div>
              ))}
            </div>
            {(touched.ingredients || hasSubmitted) && formErrors.ingredients && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.ingredients}</span>}
            <div className={styles.addIngredientWrapper} style={{ marginTop: '0.5rem' }}>
              <input
                type="text"
                placeholder="Add ingredient..."
                value={newIngredient}
                onChange={e => setNewIngredient(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddIngredient()}
                onFocus={() => setTouched(prev => ({ ...prev, ingredients: true }))}
                className={styles.ingredientInput}
              />
              <button className={styles.addIngredientBtn} onClick={() => {
                setTouched(prev => ({ ...prev, ingredients: true }));
                handleAddIngredient();
              }}>Add</button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Ayuda */}
      <Modal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        title="Centro de Ayuda"
        subtitle="Información útil para administrar tu tienda"
        footer={
          <Button variant="primary" fullWidth onClick={() => setIsHelpModalOpen(false)}>Entendido</Button>
        }
      >
        <div style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Gestión de Productos</h3>
          <p style={{ marginBottom: '1rem' }}>
            Como administrador, puedes <strong>Crear</strong>, <strong>Editar</strong> o <strong>Eliminar</strong> productos. Haz clic en "Crear Nuevo" para agregar un nuevo grano de café. Para modificar uno existente, usa el icono de lápiz sobre la tarjeta del producto.
          </p>

          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Búsqueda y Filtros</h3>
          <p style={{ marginBottom: '1rem' }}>
            Utiliza la barra de búsqueda en la parte superior para encontrar productos por su nombre de forma rápida. Los filtros por categoría te ayudarán a agrupar los granos según sus ingredientes u origen.
          </p>

          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Imágenes</h3>
          <p>
            Recomendamos utilizar imágenes de alta calidad. Para imágenes públicas (ej. Google Drive o Unsplash), recuerda que el sistema las optimiza automáticamente para mantener el rendimiento alto.
          </p>
        </div>
      </Modal>

      {/* Modal de Alertas */}
      <Modal
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })}
        title={alertConfig.title || 'Alerta'}
        footer={
          <>
            {alertConfig.type === 'confirm' && (
              <Button variant="outline" fullWidth onClick={() => setAlertConfig({ ...alertConfig, isOpen: false })}>
                Cancelar
              </Button>
            )}
            <Button
              variant={alertConfig.type === 'error' ? 'primary' : 'primary'}
              fullWidth
              onClick={() => {
                setAlertConfig({ ...alertConfig, isOpen: false });
                if (alertConfig.onConfirm) alertConfig.onConfirm();
              }}
              style={alertConfig.type === 'error' ? { backgroundColor: '#ef4444' } : {}}
            >
              {alertConfig.type === 'confirm' ? 'Confirmar' : 'Aceptar'}
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem 0' }}>
          <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '3rem', color: alertConfig.type === 'error' ? '#ef4444' : alertConfig.type === 'success' ? '#22c55e' : '#f59e0b', marginBottom: '1rem' }}>
            {alertConfig.type === 'error' ? 'error' : alertConfig.type === 'success' ? 'check_circle' : 'warning'}
          </span>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            {alertConfig.message}
          </p>
        </div>
      </Modal>
    </>
  );
};
