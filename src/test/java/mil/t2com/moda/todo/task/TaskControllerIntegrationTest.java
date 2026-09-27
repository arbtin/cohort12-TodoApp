package mil.t2com.moda.todo.task;

import jakarta.transaction.Transactional;
import mil.t2com.moda.todo.category.Category;
import mil.t2com.moda.todo.category.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JsonMapper jsonMapper;

    @Autowired
    private TaskService taskService;

    @Autowired
    private CategoryService categoryService;

    // Setup test objects
    Task learnTdd;
    Category started;

    @Test
    public void shouldCreateNewTask() throws Exception {
        Category started = categoryService.createCategory(new Category("started"));
        learnTdd = new Task( "Learn TDD", "research TDD", false, started);
        String learnTddJson = jsonMapper.writeValueAsString(learnTdd);

        MvcResult savedTask = mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(learnTddJson))
                .andReturn();
        String expectedType = savedTask.getRequest().getContentType();
        Task expectedTask = jsonMapper.readValue(savedTask.getResponse().getContentAsString(), Task.class);

        assertEquals(expectedType, "application/json");
        assertEquals(expectedTask.getTitle(), learnTdd.getTitle());
        assertEquals(expectedTask.getCategory().getLabel(), learnTdd.getCategory().getLabel());
    }

    @Test
    public void shouldGetAllTasks() throws Exception {
        Category finished = categoryService.createCategory(new Category("Finished"));
        Category started = categoryService.createCategory(new Category("Started"));
        taskService.createTask(new Task("Learn TDD", "tdd is good", false, finished));
        taskService.createTask(new Task("Practice TDD", "more tdd", false, started));
        // Assert
        mockMvc.perform(get("/api/v1/task"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.*", hasSize(2)))
                //.andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].title").value("Learn TDD"))
                .andExpect(jsonPath("$[1].title").value("Practice TDD"))
                //.andExpect(jsonPath("$[0].category.id").value(1L))
                .andExpect(jsonPath("$[0].category.label").value("Finished"))
                .andExpect(jsonPath("$[1].category.label").value("Started"));
                //.andExpect(jsonPath("$[1].id").value(2L))
    }

    @Test
    public void shouldGetTaskById() throws Exception {
        // Arrange
        Category failed = categoryService.createCategory(new Category("failed"));
        Task savedTask = taskService.createTask(new Task("blank task", "no description", false, failed));

        // Act
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/task/" + savedTask.getId()))
                .andExpect(status().isOk())
                //.andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("blank task"))
                //.andExpect(jsonPath("$.category.id").value(1L))
                .andExpect(jsonPath("$.category.label").value("failed"));
    }
}
