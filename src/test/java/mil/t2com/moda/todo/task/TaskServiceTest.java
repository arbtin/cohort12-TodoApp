package mil.t2com.moda.todo.task;

import mil.t2com.moda.todo.category.Category;
import mil.t2com.moda.todo.category.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    TaskService mockTaskService;

    Task learnMock;
    Task learnTdd;
    Task deleteTask;
    Category started;
    Category finished;

    List<Task> tasks = new ArrayList<>();

    // Start using when refactoring
    @BeforeEach
    void setUp() {
        started = new Category("started");
        finished = new Category("finished");
        // Arrange
        learnMock = new Task("Learn about Mocks", "Learn about Inject mocks", false, started);
        learnMock.setId(1L);
        learnTdd = new Task("Learn TDD", "I learned TDD", true, finished);
        learnTdd.setId(2L);

        deleteTask = new Task("Delete Task", "this is done", true, finished);
        deleteTask.setId(3L);
    }

    @Test
    void shouldSaveNewTask() {
        // Act
        when(taskRepository.save(learnMock)).thenReturn(learnMock);
        Task result = mockTaskService.createTask(learnMock);

        // Assert
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Learn about Mocks");
        assertThat(result.getCategory().getLabel()).isEqualTo("started");

        verify(taskRepository, only()).save(learnMock);
    }

    @Test
    void shouldSaveNewTaskWithNewCategory() {
        // Act
        when(taskRepository.save(learnMock)).thenReturn(learnMock);

        Task result = mockTaskService.createTask(learnMock);

        assertThat(result.getCategory().getLabel()).isEqualTo("started");
        verify(taskRepository, only()).save(learnMock);
    }

    @Test
    void shouldGetAllTasks() {
        // Act
        tasks.addAll(List.of(learnMock, learnTdd));
        when(taskRepository.findAll()).thenReturn(tasks);

        List<Task> results = mockTaskService.getAllTasks();

        verify(taskRepository, only()).findAll();
        assertThat(results).isEqualTo(tasks);
    }

    @Test
    void shouldFindTaskById() {
        // Act
        when(taskRepository.findById(1L)).thenReturn(Optional.of(learnMock));

        Task result = mockTaskService.getTaskById(1L);

        verify(taskRepository, only()).findById(1L);
        assertThat(result).isEqualTo(learnMock);
    }

    @Test
    void shouldSaveAllTasks() {
        // Act
        when(taskRepository.saveAll(tasks)).thenReturn(tasks);

        List<Task> result = mockTaskService.saveAllTasks(tasks);

        verify(taskRepository, only()).saveAll(tasks);
        assertThat(result).isEqualTo(tasks);
    }

    @Test
    void shouldDeleteExistingTask() {
        doNothing().when(taskRepository).deleteById(deleteTask.getId());
        mockTaskService.removeTaskById(deleteTask.getId());

        verify(taskRepository, times(1)).deleteById(deleteTask.getId());
    }
}