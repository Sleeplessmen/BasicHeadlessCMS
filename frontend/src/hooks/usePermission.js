import { useContext } from 'react'
import { PermissionContext } from '../contexts/PermissionContext'

export const usePermission = () => useContext(PermissionContext)
