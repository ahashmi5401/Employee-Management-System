
export const handleDelete = (uid , deleteEmployee , setConfirmAction , setShowConfirm) => {
  setConfirmAction(() => async () => {
    await deleteEmployee(uid)
    setShowConfirm(false)
  })
  setShowConfirm(true)
}