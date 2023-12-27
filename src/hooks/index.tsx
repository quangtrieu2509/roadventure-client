import { useEffect } from "react"

const useDocumentTitle = (title?: string): void => {
  useEffect(() => {
    document.title = title || "Roadventure"
  }, [title])
}

export default useDocumentTitle
