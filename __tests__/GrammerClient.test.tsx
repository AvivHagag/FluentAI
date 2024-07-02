import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import GrammerClient from '../components/practice/grammer/grammer-client'
import * as openai from '../actions/openai'
import React from 'react'

// Mock the generatePrompt ucton
jest.mock('../actions/openai', () => ({
  generatePrompt: jest.fn(),
}))

describe('GrammerClient', () => {
  it('renders grammar level buttons and handles user input correctly', async () => {
    const mockGeneratePrompt = openai.generatePrompt as jest.Mock
    const mockResponse = {
      mistake: 'She go to school.',
      correct: 'She goes to school.',
    }
    mockGeneratePrompt.mockResolvedValue(mockResponse)

    render(<GrammerClient />)

    // Check if level buttons are rendered
    expect(
      screen.queryByText('Hello!, Choose your level for grammar please.')
    ).not.toBeNull()
    expect(screen.queryByText('Hard')).not.toBeNull()
    expect(screen.queryByText('Medium')).not.toBeNull()
    expect(screen.queryByText('Easy')).not.toBeNull()

    // Simulate clicking the "Hard" button
    fireEvent.click(screen.getByText('Hard'))
    await screen.findByText(mockResponse.mistake)

    // Check if mistake sentence is displayed
    expect(screen.queryByText(mockResponse.mistake)).not.toBeNull()

    // Simulate user input and submit
    fireEvent.change(screen.getByPlaceholderText('Type your answer here...'), {
      target: { value: 'She goes to school.' },
    })
    fireEvent.click(screen.getByText('Submit Answer'))

    // Check if the response to the user's answer is correct
    expect(screen.queryByText('Correct!')).not.toBeNull()
  })

  it('shows incorrect message when user answer is wrong', async () => {
    const mockGeneratePrompt = openai.generatePrompt as jest.Mock
    const mockResponse = {
      mistake: 'She go to school.',
      correct: 'She goes to school.',
    }
    mockGeneratePrompt.mockResolvedValue(mockResponse)

    render(<GrammerClient />)

    // Simulate clicking the "Hard" button
    fireEvent.click(screen.getByText('Hard'))
    await screen.findByText(mockResponse.mistake)

    // Check if mistake sentence is displayed
    expect(screen.queryByText(mockResponse.mistake)).not.toBeNull()

    // Simulate user input and submit
    fireEvent.change(screen.getByPlaceholderText('Type your answer here...'), {
      target: { value: 'She go to schools.' },
    })
    fireEvent.click(screen.getByText('Submit Answer'))

    // Check if the response to the user's answer is incorrect
    expect(screen.queryByText('Incorrect. Try again.')).not.toBeNull()
  })
})
