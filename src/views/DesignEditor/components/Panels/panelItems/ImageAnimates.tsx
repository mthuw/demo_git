import React, { useState, useRef, useCallback } from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { Delete } from "baseui/icon"
import { IMAGE_ANIMATES } from "~/constants/design-editor"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import * as PIXI from "pixi.js"
import PlaybackController from "../../Playback/Controler"
import { ease } from "pixi-ease"

const ANIMATES = {
  Fade: {
    alpha: 0,
    repeat: true,
    reverse: true,
    duration: 2000,
  },
  Fly: {
    opacity: 0.05,
    duration: 2000,
  },
}
interface Animates {
  repeat: boolean
  reverse: boolean
}

const ImageAnimates = (sprite: PIXI.Sprite, animation: Animates) => {
  const animate = IMAGE_ANIMATES.map((animate) => {
    console.log(animate.name)
    const applyAnimate = () => {
      switch (animate.name) {
        case "Fade":
          sprite.alpha = 0
          ease.add(sprite, { alpha: 1 }, { repeat: true, reverse: true })
        case "Zoom":
          ease.add(sprite, { scale: 0.2 }, { repeat: true, reverse: true })
      }
    }
  })
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
            {IMAGE_ANIMATES.map((animate, index) => {
              return (
                <Block style={{ cursor: "pointer" }} key={index}>
                  <Block
                    onClick={() => {}}
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

export default ImageAnimates
