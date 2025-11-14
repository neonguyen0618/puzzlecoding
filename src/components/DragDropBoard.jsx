import { useMemo } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

import PuzzleBlock from "./PuzzleBlock.jsx";

export default function DragDropBoard({
  blocks,
  order,
  solution,
  onReorder,
  showHints
}) {
  
  /* ===========================
     BLOCK MAP (ID → Block Data)
  ============================ */
  const blockMap = useMemo(() => {
    const map = {};
    blocks.forEach((b) => {
      map[b.id] = b;
    });
    return map;
  }, [blocks]);


  /* ===========================
     DRAG END HANDLER
  ============================ */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(active.id);
    const newIndex = order.indexOf(over.id);
    const newOrder = arrayMove(order, oldIndex, newIndex);

    onReorder(newOrder);
  };


  /* ===========================
     INCORRECT BLOCK DETECT
     (NO setState – purely derived)
  ============================ */
  const incorrectIds = useMemo(() => {
    if (!showHints) return new Set();

    const incorrect = new Set();
    order.forEach((id, index) => {
      if (solution[index] !== id) incorrect.add(id);
    });

    return incorrect;
  }, [order, solution, showHints]);


  /* ===========================
     RENDER
  ============================ */
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className="puzzle-board">
          {order.map((id) => (
            <PuzzleBlock
              key={id}
              id={id}
              code={blockMap[id].code}
              isIncorrect={incorrectIds.has(id)}   // AUTO APPLIES .hint
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
