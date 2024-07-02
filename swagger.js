module.exports = {
  openapi: '3.0.0',
  info: {
      title: 'Task Management System API Documentation',
      description: 'This document outlines the endpoints and methods available for interacting with the Task Management System API.',
      version: '1.0.0',
  },
  servers: [
      {
          url: '/api',
      },
  ],
  tags: [
      {
          name: 'Tasks'
      },
      {
          name: 'User Authentication'
      },
  ],
  paths: {
      '/tasks/create': {
          post: {
              tags: ['Tasks'],
              security: [{
                bearerAuth: []
            }],
              summary: 'Creating a Task',
              requestBody: {
                  required: true,
                  content: {
                      'application/json': {
                          schema: {
                              $ref: '#/components/schemas/TaskInput',
                          },
                          example: {
                              title: "new title",  
                              description: "task1"
                          }
                      },
                  },
              },
              responses: {
                  '200': {
                        description: 'Successful operation',
                    },
              },
        },
      },
      '/tasks': {
          get: {
              tags: ['Tasks'],
              security: [{
                bearerAuth: []
            }],
              summary: 'Get all user tasks',
              responses: {
                  '200': {
                      description: 'Successful operation',
                  },
            },
        },
      },
      '/tasks/{id}': {
          get: {
            tags: ['Tasks'],
            security: [{
                bearerAuth: []
                }],
                summary: 'Get a task by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path', 
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'Unique identifier of the task.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
        },
        '/tasks/update/{id}': {
          put: {
            tags: ['Tasks'],
            security: [{
                bearerAuth: []
                }],
                summary: 'Update a task by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path', 
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'Unique identifier of the task.',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TaskInput',
                            },
                            example: {
                                title: "new title",  
                                description: "test description"
                            }
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
        },
        '/tasks/update/status/{id}': {
          put: {
            tags: ['Tasks'],
            security: [{
                bearerAuth: []
                }],
                summary: 'Update status of a task',
                parameters: [
                    {
                        name: 'id',
                        in: 'path', 
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'Unique identifier of the task.',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TaskStatusInput',
                            },
                            example: {
                                status: "completed",  
                            }
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
        },
        '/tasks/delete/{id}': {
          delete: {
            tags: ['Tasks'],
            security: [{
                bearerAuth: []
                }],
                summary: 'Delete a task by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path', 
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'Unique identifier of the task.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful operation',
                    },
                },
            },
        },        
      '/auth/signup': {
          post: {
              tags: ['User Authentication'],
              summary: 'Registration',
              requestBody: {
                  required: true,
                  content: {
                      'application/json': {
                          schema: {
                              $ref: '#/components/schemas/RegistrationInput',
                          },
                      },
                  },
              },
              responses: {
                  '200': {
                      description: 'Successful operation',
                  },
              },
          },
      },
      '/auth/signin': {
          post: {
              tags: ['User Authentication'],
              summary: 'Login',
              requestBody: {
                  required: true,
                  content: {
                      'application/json': {
                          schema: {
                              $ref: '#/components/schemas/LoginInput',
                          },
                      },
                  },
              },
              responses: {
                  '200': {
                      description: 'Successful operation',
                  },
              },
          },
      },
      '/auth/info': {
          get: {
              tags: ['User Authentication'],
              summary: 'Get user info',
              security: [{
                bearerAuth: []
                }],
              responses: {
                  '200': {
                      description: 'Successful operation',
                  },
              },
          },
      },
  },
  components: {
      securitySchemes: {
          bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT"
          }
      },
      schemas: {
        TaskInput: {
              type: "object",
              required: ["title", "description"],
              properties: {
                title: {
                    type: "string",
                    minLength: 3,
                    maxLength: 50,
                  },  
                  description: {
                    type: "string",
                    minLength: 3,
                    maxLength: 50,
                  }
              },
          },
          TaskStatusInput: {
            type: "object",
            required: ["status"],
            properties: {
              status: {
                  type: "string",
                  enum: ["not_completed", "completed"]
                }
            },
        },
          RegistrationInput: {
              type: 'object',
              properties: {
                  firstName: {
                      type: 'string',
                      minLength: 3,
                      maxLength: 30,
                  },
                  lastName: {
                      type: 'string',
                      minLength: 3,
                      maxLength: 30,
                  },
                  email: {
                      type: 'string',
                      format: 'email',
                  },
                  password: {
                      type: 'string',
                      pattern: '^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*[0-9]{2,})(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
                  },
              },
          },
          LoginInput: {
              type: 'object',
              properties: {
                  email: {
                      type: 'string',
                      format: 'email',
                  },
                  password: {
                      type: 'string',
                      minLength: 5,
                  },
              },
          },
      },
  },
};