import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Button, SIZE, KIND } from "baseui/button"
import useAppContext from "~/hooks/useAppContext"

const Animation = () => {
  const activeObject = useActiveObject() as any
  const { setActiveSubMenu } = useAppContext()
  const editor = useEditor()
  return (
    <Block>
      <Button onClick={() => setActiveSubMenu("ImageAnimates")} size={SIZE.compact} kind={KIND.tertiary}>
        Animation
      </Button>
    </Block>
  )
}

export default Animation
