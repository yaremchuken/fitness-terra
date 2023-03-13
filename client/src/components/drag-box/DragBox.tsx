import { useDrag } from 'react-dnd'

type DragBoxProps = {
  item: any
  type: string
  children: any
}

const DragBox = ({ item, type, children }: DragBoxProps) => {
  const [{ opacity }, dragRef] = useDrag({
    type,
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  return (
    <div ref={dragRef} style={{ opacity }} draggable>
      {children}
    </div>
  )
}

export default DragBox
