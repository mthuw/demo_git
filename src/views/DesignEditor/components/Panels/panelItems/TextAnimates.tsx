import React, { useState, useRef } from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { Delete } from "baseui/icon"
import { TEXT_ANIMATES } from "~/constants/design-editor"
import { useActiveObject, useEditor } from "@layerhub-io/react"

import * as PIXI from "pixi.js"
import { Ease, ease } from "pixi-ease"
import { set } from "lodash"

const test = PIXI.DisplayObject
const app = new PIXI.Application()
const pixiText = new PIXI.Text()
app.stage.addChild(pixiText)

// Định nghĩa hàm fly
function fly(pixiText: PIXI.Text, targetPosition: { x: number; y: number }, duration: number) {

  // Thiết lập thời gian bắt đầu di chuyển
  let startTime = Date.now()

  // Vòng lặp chính của ứng dụng PIXI
  function animate() {
    requestAnimationFrame(animate)

    // Tính toán thời gian đã trôi qua
    const elapsedTime = Date.now() - startTime

    // Nếu đã đến thời điểm kết thúc
    if (elapsedTime >= duration) {
      // Đặt vị trí của pixiText thành vị trí đích
      pixiText.position.copyFrom(targetPosition)
    } else {
      // Tính toán vị trí hiện tại của pixiText
      const ratio = elapsedTime / duration
      const currentPosition = new PIXI.Point(
        pixiText.position.x + (targetPosition.x - pixiText.position.x) * ratio,
        pixiText.position.y + (targetPosition.y - pixiText.position.y) * ratio
      )
      pixiText.position.copyFrom(currentPosition)
    }

    app.renderer.render(app.stage)
  }

  animate()
}

// Thiết lập vị trí ban đầu của pixiText
pixiText.position.set(0, 0)

const ANIMATES = {
  None: {
    opacity: 1,
  },
  Fade: {
    opacity: 0,
    duration: 10000,
    // fade,
  },
  Fly: {
    animate: () => { fly(pixiText, new PIXI.Point(500, 500), 2000) },
  },
}


interface Animation {
  repeat: boolean
  reverse: boolean
}

const TextAnimates = () => {
  const activeObject = useActiveObject()

  const editor = useEditor()
  const applyAnimate = (name: string) => {
    if (editor) {
      //  @ts-ignore
      const animate = ANIMATES[name]
      if (animate) {
        editor.objects.update(animate)
      }
    }
  }
  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Animates</Block>

        <Block $style={{ cursor: "pointer", display: "flex" }}>
          <Delete size={24} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <Block $style={{ display: "grid", gridTemplateColumns: "80px 80px 80px", gap: "0.5rem" }}>
            {TEXT_ANIMATES.map((animate, index) => {
              return (
                <Block style={{ cursor: "pointer" }} key={index}>
                  <Block
                    onClick={() => applyAnimate(animate.name)}
                    $style={{
                      border: "1px solid #afafaf",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px",
                    }}
                  >
                    {/* <img style={{ width: "70px" }} src={effect.preview} /> */}
                  </Block>
                  <Block
                    $style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      fontSize: "14px",
                    }}
                  >
                    {animate.name}
                  </Block>
                </Block>
              )
            })}
          </Block>
        </Block>
      </Scrollable>
    </Block>
  )
}

export default TextAnimates
