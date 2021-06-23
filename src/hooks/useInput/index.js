import { useState, useEffect } from 'react'
import { regexps, strings } from '../../helpers/constants'

export default useInput = ({ typeOfInput }) => {
  const [typeInput, setTypeInput] = useState(null)
  const [inputData, setInputData] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [editable, setEditable] = useState(null)
  const [firstEditing, setFirstEditing] = useState(true)
  const [showingInputData, setShowingInputData] = useState(false)
  const [maxLength, setMaxLength] = useState()
  const [feedbackPositive, setFeedbackPositive] = useState('')
  const [feedbackNegative, setFeedbackNegative] = useState('')
  const [feedback, setFeedback] = useState('')
  const [autoCompleteType, setAutoCompleteType] = useState('off')
  const [autoCorrect, setAutoCorrect] = useState(true)
  const [autoCapitalize, setAutoCapitalize] = useState('sentences')
  const [regex, setRegex] = useState(null)

  useEffect(() => {
    switch (typeOfInput) {
      case 'disabled':
        setTypeInput('disabled')
        setEditable(false)
        break
      case 'name':
        setTypeInput('field')
        setPlaceholder(strings.placeholderName)
        setEditable(true)
        setShowingInputData(true)
        setFeedbackPositive(strings.feedbackPositiveName)
        setFeedbackNegative(strings.feedbackNegativeName)
        setAutoCompleteType('off')
        setAutoCorrect(true)
        setMaxLength(50)
        setAutoCapitalize('sentences')
        setRegex((regex) => (!regex ? regexps.name : regex))
        break
      case 'word':
        setTypeInput('field')
        setPlaceholder(strings.placeholderWord)
        setEditable(true)
        setShowingInputData(true)
        setFeedbackPositive(strings.feedbackPositiveWord)
        setFeedbackNegative(strings.feedbackNegativeWord)
        setAutoCompleteType('off')
        setAutoCorrect(true)
        setMaxLength(50)
        setAutoCapitalize('sentences')
        setRegex((regex) => (!regex ? regexps.word : regex))
        break
      case 'email':
        setTypeInput('field')
        setPlaceholder(strings.placeholderEmail)
        setEditable(true)
        setShowingInputData(true)
        setFeedbackPositive(strings.feedbackPositiveEmail)
        setFeedbackNegative(strings.feedbackNegativeEmail)
        setAutoCompleteType('email')
        setAutoCorrect(false)
        setMaxLength(80)
        setAutoCapitalize('none')
        setRegex((regex) => (!regex ? regexps.email : regex))
        break
      case 'emailSignIn':
        setTypeInput('field')
        setPlaceholder(strings.placeholderEmailSignIn)
        setEditable(true)
        setShowingInputData(true)
        setFeedbackPositive(strings.feedbackPositiveEmailSignIn)
        setFeedbackNegative(strings.feedbackNegativeEmailSignIn)
        setAutoCompleteType('email')
        setAutoCorrect(false)
        setMaxLength(80)
        setAutoCapitalize('none')
        setRegex((regex) => (!regex ? regexps.email : regex))
        break
      case 'password':
        setTypeInput('password')
        setPlaceholder(strings.placeholderPassword)
        setEditable(true)
        setFeedbackPositive(strings.feedbackPositivePassword)
        setFeedbackNegative(strings.feedbackNegativePassword)
        setAutoCompleteType('off')
        setAutoCorrect(false)
        setMaxLength(15)
        setAutoCapitalize('none')
        setRegex((regex) => (!regex ? regexps.password : regex))
        break
      case 'passwordSignIn':
        setTypeInput('password')
        setPlaceholder(strings.placeholderPasswordSignIn)
        setEditable(true)
        setFeedbackPositive(strings.feedbackPositivePasswordSignIn)
        setFeedbackNegative(strings.feedbackNegativePasswordSignIn)
        setAutoCompleteType('off')
        setAutoCorrect(false)
        setMaxLength(15)
        setAutoCapitalize('none')
        setRegex((regex) => (!regex ? regexps.password : regex))
        break
      case 'password-confirm':
        setTypeInput('password-confirm')
        setPlaceholder(strings.placeholderPasswordConfirm)
        setEditable(true)
        setFeedbackPositive(strings.feedbackPositivePasswordConfirm)
        setFeedbackNegative(strings.feedbackNegativePasswordConfirm)
        setAutoCompleteType('off')
        setAutoCorrect(false)
        setMaxLength(15)
        setAutoCapitalize('none')
        setRegex((regex) => (!regex ? regexps.password : regex))
        break
      case 'phone':
        setTypeInput('field')
        setPlaceholder(strings.placeholderPhone)
        setEditable(true)
        setFeedbackPositive(strings.feedbackPositivePhone)
        setFeedbackNegative(strings.feedbackNegativePhone)
        setAutoCompleteType('off')
        setAutoCorrect(false)
        setMaxLength(15)
        setAutoCapitalize('none')
        setRegex((regex) => (!regex ? regexps.phone : regex))
        break
      case 'verification':
        setTypeInput('field')
        setPlaceholder(strings.placeholderVerification)
        setEditable(true)
        setShowingInputData(true)
        setFeedbackPositive(strings.feedbackPositiveVerification)
        setFeedbackNegative(strings.feedbackNegativeVerification)
        setAutoCompleteType('off')
        setAutoCorrect(false)
        setMaxLength(6)
        setAutoCapitalize('none')
        setRegex((regex) => (!regex ? regexps.verificationCode : regex))
        break
    }
  }, [])

  useEffect(() => {
    if (regex) {
      if (regex.test(inputData.trim())) {
        typeInput === 'password' ||
        typeInput === 'password-error' ||
        typeInput === 'password-check'
          ? setTypeInput('password-check')
          : typeInput === 'password-confirm' ||
            typeInput === 'password-confirm-error' ||
            typeInput === 'password-confirm-check'
          ? setTypeInput('password-confirm-check')
          : setTypeInput('check')
        setFeedback(feedbackPositive)
        setFirstEditing(false)
      } else {
        if (!firstEditing) {
          typeInput === 'password' ||
          typeInput === 'password-check' ||
          typeInput === 'password-error'
            ? setTypeInput('password-error')
            : typeInput === 'password-confirm' ||
              typeInput === 'password-confirm-check' ||
              typeInput === 'password-confirm-error'
            ? setTypeInput('password-confirm-error')
            : setTypeInput('error')
          setFeedback(feedbackNegative)
        }
      }
    }
  }, [inputData, regex, feedbackNegative])

  const onEndEditing = () => setFirstEditing(false)

  const onChangeShowingInputData = () => setShowingInputData(!showingInputData)

  return {
    typeInput,
    setTypeInput,
    inputData,
    setInputData,
    placeholder,
    editable,
    showingInputData,
    onChangeShowingInputData,
    onEndEditing,
    feedback,
    setFeedback,
    autoCompleteType,
    autoCorrect,
    maxLength,
    autoCapitalize,
    setRegex,
    setFeedbackNegative,
  }
}
