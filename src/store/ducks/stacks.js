import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
  onboardingStack: [],
  loginStack: ['id'],
  logoutStack: [],
  nameStack: ['name'],
  emailStack: ['email'],
  startupStack: ['startup'],
  areaStack: ['area'],
  technologiesStack: ['technologies'],
  whatsappStack: ['whatsapp'],
  teamsStack: ['teams'],
  telegramStack: ['telegram'],
  discordStack: ['discord'],
  passwordStack: ['password'],
  currentPostStack: ['currentPost'],
  darkStack: ['dark'],
})

const INITIAL_STATE = {
  onboarding: false,
  logged: null,
  name: null,
  email: null,
  startup: null,
  area: null,
  technologies: null,
  whatsapp: null,
  teams: null,
  telegram: null,
  discord: null,
  password: null,
  currentPost: null,
  dark: false,
}

const onboarding = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    onboarding: true,
  }
}

const login = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    logged: action.token,
  }
}

const logout = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    logged: null,
  }
}

const nameRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    name: action.name,
  }
}

const emailRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    email: action.email,
  }
}

const startupRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    startup: action.startup,
  }
}

const areaRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    area: action.area,
  }
}

const technologiesRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    technologies: action.technologies,
  }
}

const whatsappRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    whatsapp: action.whatsapp,
  }
}

const teamsRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    teams: action.teams,
  }
}

const telegramRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    telegram: action.telegram,
  }
}

const discordRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    discord: action.discord,
  }
}

const passwordRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    password: action.password,
  }
}

const currentPostRecord = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    currentPost: action.currentPost,
  }
}

const dark = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    dark: action.dark,
  }
}

export default createReducer(INITIAL_STATE, {
  [Types.ONBOARDING_STACK]: onboarding,
  [Types.LOGIN_STACK]: login,
  [Types.LOGOUT_STACK]: logout,
  [Types.NAME_STACK]: nameRecord,
  [Types.EMAIL_STACK]: emailRecord,
  [Types.STARTUP_STACK]: startupRecord,
  [Types.AREA_STACK]: areaRecord,
  [Types.TECHNOLOGIES_STACK]: technologiesRecord,
  [Types.WHATSAPP_STACK]: whatsappRecord,
  [Types.TEAMS_STACK]: teamsRecord,
  [Types.TELEGRAM_STACK]: telegramRecord,
  [Types.DISCORD_STACK]: discordRecord,
  [Types.PASSWORD_STACK]: passwordRecord,
  [Types.CURRENT_POST_STACK]: currentPostRecord,
  [Types.DARK_STACK]: dark,
})
