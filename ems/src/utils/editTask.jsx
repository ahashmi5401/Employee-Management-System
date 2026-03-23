import {db} from '../firebase'
import {ref , update} from 'firebase/database'

export const editTask = async (taskId , updatedTask) => {
    try {
        await update(ref(db , `tasks/${taskId}`) , updatedTask)
        return{sucess : true}
    }catch (err) {
    return { success: false, error: err.message }
  }
}