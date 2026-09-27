package mil.t2com.moda.todo.category;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @GetMapping()
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

//    @GetMapping()
//    public Optional<Category> findCategoryByLabelUsingRequestParam(@RequestParam String categoryLabel) {
//        return categoryService.findCategoryByLabel(categoryLabel);
//    }

    @GetMapping("/{categoryLabel}")
    public Category getCategoryByLabelUsingPathVariable(@PathVariable String categoryLabel) {
        return categoryService.getCategoryByLabel(categoryLabel);
    }

    @GetMapping(value = "/id/", params = "id")
    public Optional<Category> getCategoryById(@RequestParam Long id) {
        return categoryService.getCategoryById(id);
    }

    @PatchMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category institution) {
        return categoryService.updateCategory(id, institution);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id) {
        categoryService.removeCategoryById(id);
        return ResponseEntity.noContent().build();
    }
}
