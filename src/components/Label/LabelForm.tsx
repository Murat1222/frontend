import { useState, type FormEvent } from "react"
import { useCreateLabel, useUpdateLabel } from "../../hooks/useLabels"
import styles from './styles.module.scss'
import type { ILabel } from "../../types/types";

interface LabelFormProps {
  label?: ILabel | null;
}

function LabelForm({label = null} : LabelFormProps) {
  const [caption, setCaption] = useState(label?.caption || '')
  const [color, setColor] = useState(label?.color || '')
  const updateLabel = useUpdateLabel();
  const createLabel = useCreateLabel();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (label) {
      updateLabel.mutate({
        id: label.id,
        caption,
        color
      })
    } else {
      createLabel.mutate({
        caption,
        color
      })
      setCaption('')
      setColor('')
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Caption"
        className={styles.form__input}
        required
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Color #..."
        className={styles.form__input}
        required
      />
      <button type="submit" className={styles.form__button}>
        {label ? "Update" : "Create"}
      </button>
    </form>
  )
}

export default LabelForm