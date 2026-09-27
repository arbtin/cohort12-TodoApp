package mil.t2com.moda.todo.category;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import org.jspecify.annotations.NullMarked;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    private String label;

    public Category() {}

    public Category(String label) { this.label = label; }

    public Long getId() { return id; }

    public String getLabel() { return label; }

    public void setId(Long id) { this.id = id; }

    public void setLabel(String label) { this.label = label; }
    }
