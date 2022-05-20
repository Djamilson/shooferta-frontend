import { validateUserPermissions } from '../utils/validateUserPermissions'
import { useAuth } from '../contexts/auth'

type UserCanParams = {
  roles?: string[]
}

export function userCan({ roles }: UserCanParams) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({ user, roles })

  return userHasValidPermissions
}
