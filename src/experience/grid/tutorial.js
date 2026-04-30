import UI from '@ui/ui'
import Touch from '@utils/touch'

export default class Tutorial {
  constructor(grid) {
    this.grid = grid
    this.first()
  }

  first() {
    UI.tutorialText.set(`${Touch.support ? '触摸' : '点击'}任意河道地块开始`).show()
    this.grid.riverBlocks.forEach(b => (b.material.uniforms.uTutorial.value = true))
  }

  second() {
    UI.tutorialText.set('旋转地块，恢复河流路径，让干涸岛屿重获生机').show()
    this.grid.riverBlocks.forEach(b => (b.material.uniforms.uTutorial.value = false))
  }

  third() {
    UI.tutorialText.set('干得漂亮！现在启航前往下一座岛屿吧！').show()
    this.grid.riverBlocks.forEach(b => (b.material.uniforms.uTutorial.value = false))
  }

  dispose() {
    UI.tutorialText.hide()
  }
}
