import React from 'react'
import { render, act } from '@testing-library/react'
import RegisterForm from '../components/auth/register-form' // Update the path to your RegisterForm component
import { getAllTeachersNameAndID } from '@/lib/ServerActions/ServerActions'
import { register } from '@/actions/register'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom/extend-expect' // Ensure to extend expect with jest-dom

jest.mock('@/lib/ServerActions/ServerActions')
jest.mock('@/actions/register')
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()
;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form correctly', async () => {
    render(<RegisterForm />)

    // Example assertions based on your form structure
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument()
    expect(document.querySelector('input[name="password"]')).toBeInTheDocument()
    expect(document.querySelector('input[name="name"]')).toBeInTheDocument()
    expect(document.querySelector('input[value="TEACHER"]')).toBeInTheDocument()
    expect(document.querySelector('input[value="STUDENT"]')).toBeInTheDocument()
  })

  it('fetches teachers when role is student', async () => {
    const mockTeachers = [
      { id: '1', name: 'Teacher One' },
      { id: '2', name: 'Teacher Two' },
    ]
    ;(getAllTeachersNameAndID as jest.Mock).mockResolvedValue(mockTeachers)

    render(<RegisterForm />)

    const studentRoleInput = document.querySelector('input[value="STUDENT"]')
    if (studentRoleInput instanceof HTMLInputElement) {
      studentRoleInput.click() // Simulate selecting student role
    }

    // Wait for teachers to be fetched and displayed (assuming you have some loading state or effect)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)) // Adjust timing as needed
    })

    expect(document.querySelector('.teacher-list')).toBeInTheDocument() // Replace with your actual class or element check
    expect(
      document.querySelectorAll('.teacher-list .teacher-item')
    ).toHaveLength(2) // Example check for rendered teachers
  })

  it('submits the form successfully', async () => {
    const mockFormValues = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      role: 'TEACHER', // Assuming default role for simplicity
    }

    const mockRegisterResponse = {
      success: true,
      error: null,
    }

    ;(register as jest.Mock).mockResolvedValue(mockRegisterResponse)

    render(<RegisterForm />)

    // Simulate filling in form fields
    const emailInput = document.querySelector('input[name="email"]')
    if (emailInput instanceof HTMLInputElement) {
      emailInput.value = mockFormValues.email
    }

    const passwordInput = document.querySelector('input[name="password"]')
    if (passwordInput instanceof HTMLInputElement) {
      passwordInput.value = mockFormValues.password
    }

    const nameInput = document.querySelector('input[name="name"]')
    if (nameInput instanceof HTMLInputElement) {
      nameInput.value = mockFormValues.name
    }

    const submitButton = document.querySelector('button[type="submit"]')
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.click() // Simulate form submission
    }

    // Wait for form submission and redirect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Adjust timing as needed
    })

    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('displays an error message when form submission fails', async () => {
    const mockFormValues = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      role: 'TEACHER', // Assuming default role for simplicity
    }

    const mockRegisterResponse = {
      success: false,
      error: 'Registration failed',
    }

    ;(register as jest.Mock).mockResolvedValue(mockRegisterResponse)

    render(<RegisterForm />)

    // Simulate filling in form fields
    const emailInput = document.querySelector('input[name="email"]')
    if (emailInput instanceof HTMLInputElement) {
      emailInput.value = mockFormValues.email
    }

    const passwordInput = document.querySelector('input[name="password"]')
    if (passwordInput instanceof HTMLInputElement) {
      passwordInput.value = mockFormValues.password
    }

    const nameInput = document.querySelector('input[name="name"]')
    if (nameInput instanceof HTMLInputElement) {
      nameInput.value = mockFormValues.name
    }

    const submitButton = document.querySelector('button[type="submit"]')
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.click() // Simulate form submission
    }

    // Wait for form submission and error message
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Adjust timing as needed
    })

    expect(document.querySelector('.form-error')).toHaveTextContent(
      'Registration failed'
    ) // Replace with your actual error message element check
  })
})
