package com.coffee.app.controller;

import com.coffee.app.model.Coffee;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/coffees")
@CrossOrigin(origins = "*")
public class CoffeeController {

    private final List<Coffee> coffees = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    @PostConstruct
    public void init() {
        coffees.add(new Coffee(
                2L,
                "Latte",
                "Som den mest populära kaffedrycken där ute består latte av en skvätt espresso och ångad mjölk med bara en gnutta skum. Den kan beställas utan smak eller med smak av allt från vanilj till pumpa kryddor.",
                Arrays.asList("Espresso", "Ångad mjölk"),
                "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhdHRlfGVufDB8fDB8fHww"
        ));
        coffees.add(new Coffee(
                3L,
                "Caramel Latte",
                "Om du gillar latte med en speciell smak kan karamell latte vara det bästa alternativet för att ge dig en upplevelse av den naturliga sötman och krämigheten hos ångad mjölk och karamell.",
                Arrays.asList("Espresso", "Ångad mjölk", "Karamellsirap"),
                "https://images.unsplash.com/photo-1599398054066-846f28917f38?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ));
        coffees.add(new Coffee(
                4L,
                "Cappuccino",
                "Cappuccino är en latte som är gjord med mer skum än ångad mjölk, ofta med ett strö av kakaopulver eller kanel på toppen. Ibland kan du hitta variationer som använder grädde istället för mjölk eller sådana som tillsätter smakämnen också.",
                Arrays.asList("Espresso", "Ångad mjölk", "Foam"),
                "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ));
        coffees.add(new Coffee(
                5L,
                "Americano",
                "Med en liknande smak som svart kaffe består americano av en espresso skott utspätt med hett vatten.",
                Arrays.asList("Espresso", "Hett vatten"),
                "https://images.unsplash.com/photo-1532004491497-ba35c367d634?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ));
        coffees.add(new Coffee(
                6L,
                "Espresso",
                "Ett espressoskott kan serveras ensamt eller användas som grund för de flesta kaffedrycker, som latte och macchiato.",
                Arrays.asList("Espresso"),
                "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ));
        coffees.add(new Coffee(
                7L,
                "Macchiato",
                "Macchiaton är en annan espresso-baserad dryck som har en liten mängd skum på toppen. Det är det glada mellanrummet mellan en cappuccino och en doppio.",
                Arrays.asList("Espresso", "Foam"),
                "https://images.unsplash.com/photo-1557772611-722dabe20327?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ));
        coffees.add(new Coffee(
                8L,
                "Mocha",
                "För alla chokladälskare där ute kommer ni att bli förälskade i en mocha. Mocha är en choklad-espressodryck med ångad mjölk och skum.",
                Arrays.asList("Espresso", "Ångad mjölk", "Choklad"),
                "https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ));
        coffees.add(new Coffee(
                9L,
                "Hot Chocolate",
                "Under kalla vinterdagar får en kopp varm choklad dig att känna dig bekväm och lycklig. Den får dig också att må bra eftersom den innehåller energigivande koffein.",
                Arrays.asList("Choklad", "Mjölk"),
                "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGhvdCUyMGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D"
        ));
        coffees.add(new Coffee(
                11L,
                "Matcha Latte",
                "Matcha latte är en grön, hälsosam kaffedryck med finkrossad matcha-te och mjölk, erbjuder mild sötma, en unik smak och en mild koffeinkick.",
                Arrays.asList("Matcha-pulver", "Mjölk", "Socker*"),
                "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWF0Y2hhJTIwbGF0dGV8ZW58MHx8MHx8fDA%3D"
        ));
        coffees.add(new Coffee(
                12L,
                "Seasonal Brew",
                "Säsongs kaffe med olika smaktoner som karamell, frukt och choklad",
                Arrays.asList("Kaffe"),
                "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg1fHxibGFjayUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D"
        ));
        coffees.add(new Coffee(
                13L,
                "Svart Te",
                "Svart te föddes i Kina. Det är tillverkat av blad från en växt som kallas Camellia och kan smaksättas olika med frukter till exempel. En trevlig, varm, smakfull och aromatisk dryck som passar till vardagen.",
                Arrays.asList("Te"),
                "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlYXxlbnwwfHwwfHx8MA%3D%3D"
        ));
        coffees.add(new Coffee(
                14L,
                "Islatte",
                "Iced latte är en kyld kaffedryck som görs genom att blanda espresso och kyld mjölk. Den serveras med isbitar och är även känd som cafè latte iced eller latte on the rocks.",
                Arrays.asList("Espresso", "Mjölk", "Is", "Sirap"),
                "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aWNlZCUyMGxhdHRlfGVufDB8fDB8fHww"
        ));
        coffees.add(new Coffee(
                15L,
                "Islatte Mocha",
                "Iced latte Mocha är en kombination av latte och mocha, som i sig är en kombination av choklad och kaffe. Den ger kalla dryckälskare en läcker upplevelse av choklad och kaffe.",
                Arrays.asList("Espresso", "Is", "Mjölk", "Choklad "),
                "https://images.unsplash.com/photo-1642647391072-6a2416f048e5?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGljZWQlMjBtb2NoYSUyMGxhdHRlfGVufDB8fDB8fHww"
        ));
        coffees.add(new Coffee(
                16L,
                "Frapino Caramel",
                "Det är en blandad eller bättre sagt skakad kaffe med vispad grädde på toppen. Ett måste för varma sommardagar.",
                Arrays.asList("coffee", "Is", "Mjölk", "Karamellsirap", "Vispgrädde*", "Karamellsås"),
                "https://images.unsplash.com/photo-1662047102608-a6f2e492411f?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJhcGlubyUyMGNhcmFtZWx8ZW58MHx8MHx8fDA%3D"
        ));
        coffees.add(new Coffee(
                17L,
                "Frapino Mocka",
                "Ännu en berömd och utsökt kall dryck för dem som föredrar choklad. Tänk dig smaken av en shake med choklad och vispad grädde på toppen.",
                Arrays.asList("Coffee", "Is", "Mjölk", "Cocoa", "Vispgrädde*"),
                "https://images.unsplash.com/photo-1530373239216-42518e6b4063?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJhcGlubyUyMG1vY2hhfGVufDB8fDB8fHww"
        ));
        coffees.add(new Coffee(
                18L,
                "Apelsinjuice",
                "Vi har inget att säga om vår nypressade apelsinjuice. Du måste prova den själv.",
                Arrays.asList("Färska Apelsiner", "Is"),
                "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fG9yYW5nZSUyMGp1aWNlfGVufDB8fDB8fHww"
        ));
        coffees.add(new Coffee(
                19L,
                "Frozen Lemonade",
                "Frozen lemonade är en uppfriskande sommardryck som kombinerar färskpressad citronsaft, is och sötning till en svalkande, syrlig och sötsyrlig smaksensation.",
                Arrays.asList("Citronsaft", "Is", "Socker*"),
                "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxlbW9uYWRlJTIwd2l0aCUyMGljZXxlbnwwfHwwfHx8MA%3D%3D"
        ));
        coffees.add(new Coffee(
                20L,
                "Lemonad",
                "Var känd i Paris först och blev sedan mycket populär i hela Europa. Denna söta, färglösa, kolsyrade dryck görs genom att blanda citronsaft och kolsyrat vatten.",
                Arrays.asList("Citronsaft", "Kolsyrat vatten", "Honung"),
                "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVtb25hZGV8ZW58MHx8MHx8fDA%3D"
        ));
        
        long maxId = coffees.stream().mapToLong(Coffee::getId).max().orElse(0L);
        counter.set(maxId);
    }

    @GetMapping
    public List<Coffee> getAllCoffees() {
        return coffees;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coffee> getCoffeeById(@PathVariable Long id) {
        Optional<Coffee> coffee = coffees.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();
        return coffee.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Coffee> createCoffee(@RequestBody Coffee coffee) {
        coffee.setId(counter.incrementAndGet());
        coffees.add(coffee);
        return ResponseEntity.status(HttpStatus.CREATED).body(coffee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Coffee> updateCoffee(@PathVariable Long id, @RequestBody Coffee coffeeDetails) {
        for (int i = 0; i < coffees.size(); i++) {
            Coffee coffee = coffees.get(i);
            if (coffee.getId().equals(id)) {
                coffeeDetails.setId(id);
                coffees.set(i, coffeeDetails);
                return ResponseEntity.ok(coffeeDetails);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoffee(@PathVariable Long id) {
        boolean removed = coffees.removeIf(c -> c.getId().equals(id));
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
