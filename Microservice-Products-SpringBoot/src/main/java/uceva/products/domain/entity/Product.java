package uceva.products.domain.entity;

import java.util.List;

/**
 * Entidad de dominio que representa un producto.
 * Capa: Domain (Clean Architecture).
 */
public class Product {

    /** Categorías válidas de un producto. */
    public static final List<String> CATEGORIES = List.of("Lacteos", "Carnes", "Frutas", "Verduras");

    public Integer id;
    public String name;
    public String category;
    public Float price;

    public Product(Integer id, String name, String category, Float price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
    }
}
