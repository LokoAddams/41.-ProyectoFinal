# Etapa de construcción (Build)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar el pom.xml y descargar las dependencias primero (para aprovechar la caché de Docker)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar el código fuente y compilar el proyecto
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa de ejecución (Run)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el JAR generado desde la etapa de construcción
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
