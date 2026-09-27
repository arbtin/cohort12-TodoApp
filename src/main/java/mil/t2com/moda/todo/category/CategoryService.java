package mil.t2com.moda.todo.category;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category createCategoryIfNotExists(String label) {
        if (label == null || label.trim().isEmpty()) {
            throw new IllegalArgumentException("Label cannot be null or empty");
        }

        String findTrimmedLabel = label.trim();
        String formattedLabel = Character.toUpperCase(findTrimmedLabel.charAt(0)) + findTrimmedLabel.substring(1);

        return categoryRepository.findByLabel(formattedLabel).orElseGet(() -> categoryRepository.save(new Category(formattedLabel)));

        // Refactored below to make the above cleaner, left it here so you can see the changes:
//        if(queryCategory.isEmpty()) {
//            String trimmedLabel = label.trim();
//            return categoryRepository.save(new Category(Character.toUpperCase(trimmedLabel.charAt(0)) + trimmedLabel.substring(1)));
//        }
//
//        return queryCategory.get();
    }

    public Category getCategoryByLabel(String label) throws ResourceNotFoundException {
        return categoryRepository.findByLabel(label)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + label));
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) { return categoryRepository.findById(id); }

    public Category updateCategory(Long id, Category updatedCategory) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            updatedCategory.setId(optionalCategory.get().getId());
            return categoryRepository.save(updatedCategory);
        }
        throw new ResourceNotFoundException("Category not found: " + id);
    }

    public void removeCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

}