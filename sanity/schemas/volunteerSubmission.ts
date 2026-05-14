export default {
  name: 'volunteerSubmission',
  title: 'Volunteer Submission',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'postalCode', title: 'Postal Code', type: 'string' },
    { 
      name: 'quizAnswers', 
      title: 'Quiz Answers', 
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string' },
            { name: 'answer', type: 'string' }
          ]
        }
      ]
    },
    { name: 'calculatedRole', title: 'Calculated Role', type: 'string' },
    { 
      name: 'status', 
      title: 'Status', 
      type: 'string',
      options: { list: ['New', 'Contacted', 'Active', 'Inactive'] },
      initialValue: 'New'
    }
  ]
}
