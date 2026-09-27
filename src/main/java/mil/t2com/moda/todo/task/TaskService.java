package mil.t2com.moda.todo.task;

import mil.t2com.moda.todo.category.Category;
import mil.t2com.moda.todo.category.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryService categoryService;

    public TaskService(TaskRepository taskRepository, CategoryService categoryService) {
        this.taskRepository = taskRepository;
        this.categoryService = categoryService;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElseThrow();
    }

    public List<Task> saveAllTasks(List<Task> tasks) {
        return taskRepository.saveAll(tasks);
    }


    public Task updateTask(Long id, Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            updatedTask.setId(optionalTask.get().getId());
            return taskRepository.save(updatedTask);
        }
        throw new TaskService.ResourceNotFoundException("Task not found: " + id);
    }

    public void removeTaskById(Long id) {
        taskRepository.deleteById(id);
    }

//    public void removeTaskById(Long id) {
//        try {
//            taskRepository.deleteById(id);
//            //return "deleted";
//        } catch (IllegalArgumentException e) {
//            //return "not found";
//        }
//    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }
}