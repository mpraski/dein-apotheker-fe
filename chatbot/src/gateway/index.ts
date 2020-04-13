import { Client } from '@/client'
import { Record, extractAnswer, Question } from '@/store/answer/types'

export class Gateway {
  /* eslint-disable no-useless-constructor */
  constructor (private client: Client) { }

  public async sendAnswer (record: Record): Promise<Question> {
    const scenario = 'scenario_demo'
    const answer = extractAnswer(record.answer)[0]

    // mock the flow
    switch (answer) {
      case 'running_nose':
        return {
          ID: 'have_running_nose',
          messages: [
            {
              type: 'MESSAGE_TEXT',
              content: 'Do you have a **running nose**?'
            }
          ],
          input: {
            type: 'INPUT_SINGLE',
            options: [
              {
                id: 'yes_1',
                content: 'Yes'
              },
              {
                id: 'no_1',
                content: 'No, it was a typing error'
              }
            ]
          },
          scenario
        } as Question
      case 'yes_1':
        return {
          ID: 'is_medicine',
          messages: [
            {
              type: 'MESSAGE_TEXT',
              content: 'Is that medicine for you?'
            }
          ],
          input: {
            type: 'INPUT_SINGLE',
            options: [
              {
                id: 'yes_2',
                content: 'Yes'
              },
              {
                id: 'no_2',
                content: 'No'
              }
            ]
          },
          scenario
        } as Question
      case 'no_1':
        return {
          ID: 'symptom',
          messages: [
            {
              type: 'MESSAGE_TEXT',
              content: 'Let\'s start over :)'
            },
            {
              type: 'MESSAGE_TEXT',
              content: 'For which **symptom** are you looking for a drug?'
            }
          ],
          input: {
            type: 'INPUT_MULTIPLE',
            options: [
              {
                id: 'running_nose',
                content: 'Running nose'
              }
            ]
          },
          scenario
        } as Question
      case 'no_2':
        return {
          ID: 'warning_one',
          messages: [
            {
              type: 'MESSAGE_TEXT',
              content: 'Please make sure that you answer all the following questions (especially the age) for the person who shall tkae the medication. Please not we do not give advice for childrens\' medication yet! Thank you for understanding.'
            }
          ],
          input: {
            type: 'INPUT_SINGLE',
            options: [
              {
                id: 'understood_1',
                content: 'I understand'
              }
            ]
          },
          scenario
        } as Question
      case 'yes_2':
      case 'understood_1':
        return {
          ID: 'symptom_duration',
          messages: [
            {
              type: 'MESSAGE_TEXT',
              content: 'How long have you had the symptoms?'
            }
          ],
          input: {
            type: 'INPUT_SINGLE',
            options: [
              {
                id: 'less_week',
                content: 'Less than a week'
              },
              {
                id: 'more_week',
                content: 'More than a week'
              }
            ]
          },
          scenario
        } as Question
      case 'less_week':
      case 'more_week':
        return {
          ID: 'cat_picture',
          messages: [
            {
              type: 'MESSAGE_TEXT',
              content: 'End of demo. You win a cat picture!'
            },
            {
              type: 'MESSAGE_IMAGE',
              image:
                'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
              alt: 'Have a cat picture'
            }
          ],
          input: {
            type: 'INPUT_PROMPT'
          },
          scenario
        } as Question
    }

    return {
      ID: 'lel',
      messages: [],
      input: {
        type: 'INPUT_PROMPT'
      },
      scenario
    }
  }
}
