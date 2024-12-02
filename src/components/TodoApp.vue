<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Cyfer's To-do App</h2>

    <!-- Task Input Form -->
    <div class="card p-3 mb-4">
      <div class="row g-3">
        <div class="col-md-6">
          <input 
            v-model="task" 
            type="text" 
            placeholder="Add new Task" 
            class="form-control"
            @keyup.enter="addTask" 
          />
        </div>
        <div class="col-md-2">
          <select v-model="newTaskPriority" class="form-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="col-md-2">
          <input 
            type="date" 
            v-model="newTaskDueDate" 
            class="form-control"
          />
        </div>
        <div class="col-md-2">
          <button @click="addTask" class="btn btn-primary w-100">
            {{ editTaskIndex === null ? 'Add Task' : 'Update Task' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-3 mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <select v-model="statusFilter" class="form-select">
            <option value="">All Statuses</option>
            <option v-for="status in availableStatuses" :key="status" :value="status">
              {{ firstCharUpperCase(status) }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <select v-model="priorityFilter" class="form-select">
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="col-md-4">
          <select v-model="sortBy" class="form-select">
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tasks Table -->
    <div class="card">
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col">Due Date</th>
            <th scope="col" class="text-end">#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in filteredAndSortedTasks" :key="index">
            <td>
              <div class="d-flex align-items-center">
                <span :class="getPriorityBadgeClass(task.priority)" class="me-2">
                  {{ firstCharUpperCase(task.priority) }}
                </span>
                {{ task.name }}
              </div>
            </td>
            <td>
              <span 
                @click="changeStatus(index)" 
                class="pointer status-badge" 
                :class="task.status"
              >
                {{ firstCharUpperCase(task.status) }}
              </span>
            </td>
            <td>{{ task.dueDate }}</td>
            <td class="text-end">
              <button @click="editTask(index)" class="btn btn-sm btn-outline-primary me-2">
                <i class="fa fa-pencil"></i>
              </button>
              <button @click="deleteTask(index)" class="btn btn-sm btn-outline-danger">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/todo-app.css'
import useTodoApp from '@/composables/useTodoApp'

export default {
  name: 'TodoApp',
  setup() {
    return {
      ...useTodoApp()
    }
  }
}
</script>
