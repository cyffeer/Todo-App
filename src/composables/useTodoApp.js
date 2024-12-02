import { ref, computed } from 'vue'

export default function useTodoApp() {
  // State
  const task = ref('')
  const editTaskIndex = ref(null)
  const availableStatuses = ref(['to-do', 'in-progress', 'done'])
  const newTaskPriority = ref('medium')
  const newTaskDueDate = ref('')
  const statusFilter = ref('')
  const priorityFilter = ref('')
  const sortBy = ref('dueDate')
  
  const tasks = ref([
    {
      name: 'Study Vue.js',
      status: 'to-do',
      priority: 'high',
      dueDate: '2024-03-25'
    },
    {
      name: 'Create a new project',
      status: 'to-do',
      priority: 'medium',
      dueDate: '2024-03-30'
    }
  ])

  // Computed
  const filteredAndSortedTasks = computed(() => {
    let filtered = tasks.value.filter(task => {
      const statusMatch = !statusFilter.value || task.status === statusFilter.value
      const priorityMatch = !priorityFilter.value || task.priority === priorityFilter.value
      return statusMatch && priorityMatch
    })

    return filtered.sort((a, b) => {
      if (sortBy.value === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      } else if (sortBy.value === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      } else {
        return availableStatuses.value.indexOf(a.status) - availableStatuses.value.indexOf(b.status)
      }
    })
  })

  // Methods
  const addTask = () => {
    if(task.value.length === 0) {
      alert('Task cannot be empty')
      return
    }

    const newTask = {
      name: task.value,
      status: 'to-do',
      priority: newTaskPriority.value,
      dueDate: newTaskDueDate.value
    }
    
    if(editTaskIndex.value === null) {
      tasks.value.push(newTask)
    } else {
      tasks.value[editTaskIndex.value] = { 
        ...tasks.value[editTaskIndex.value], 
        ...newTask 
      }
      editTaskIndex.value = null
    }

    // Reset form
    task.value = ''
    newTaskPriority.value = 'medium'
    newTaskDueDate.value = ''
  }

  const editTask = (index) => {
    task.value = tasks.value[index].name
    newTaskPriority.value = tasks.value[index].priority
    newTaskDueDate.value = tasks.value[index].dueDate
    editTaskIndex.value = index
  }

  const deleteTask = (index) => {
    if (confirm('Are you sure you want to delete this task?')) {
      tasks.value.splice(index, 1)
    }
  }

  const changeStatus = (index) => {
    let newIndex = availableStatuses.value.indexOf(tasks.value[index].status)
    newIndex = newIndex === 2 ? 0 : newIndex + 1
    tasks.value[index].status = availableStatuses.value[newIndex]
  }

  const firstCharUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const getPriorityBadgeClass = (priority) => {
    return {
      'badge rounded-pill bg-danger': priority === 'high',
      'badge rounded-pill bg-warning': priority === 'medium',
      'badge rounded-pill bg-info': priority === 'low'
    }
  }

  return {
    // State
    task,
    editTaskIndex,
    availableStatuses,
    newTaskPriority,
    newTaskDueDate,
    statusFilter,
    priorityFilter,
    sortBy,
    tasks,
    
    // Computed
    filteredAndSortedTasks,
    
    // Methods
    addTask,
    editTask,
    deleteTask,
    changeStatus,
    firstCharUpperCase,
    getPriorityBadgeClass
  }
} 