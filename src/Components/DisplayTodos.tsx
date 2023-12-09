import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GroupInput, Div, Button } from './Styled/Styledinputside';
import { GroupDiv, GroupName, H3, H4, DeleteGroup, Taskside, Input, TodoBox,
Checkbox, Leftside, Rightside, Delete, Copy } from './Styled/Styledgroup';


function DisplayGroups() {
  const [newGroup, setNewGroup] = useState('');
  const [groups, setGroups] = useState<
    { id: string; title: string; items: { text: string; completed: boolean }[] }[]
  >(() => {
    const localValue = localStorage.getItem('GROUPS');
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem('GROUPS', JSON.stringify(groups));
  }, [groups]);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (newGroup === '') return;

    setGroups((currentGroups) => [
      ...currentGroups,
      { id: crypto.randomUUID(), title: newGroup, items: [] },
    ]);
    setNewGroup('')
  }

  function handleTodoSubmit(groupId: string, todo: string) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? { ...group, items: [...group.items, { text: todo, completed: false }] }
          : group
      )
    )
  }

  function handleCheckboxChange(groupId: string, index: number) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              items: group.items.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
              ),
            }
          : group
      )
    )
  }

  function handleGroupDelete(groupId: string) {
    setGroups((currentGroups) =>
      currentGroups.filter((group) => group.id !== groupId)
    )
  }

  function deleteTodo(groupId: string, index: number) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? { ...group, items: group.items.filter((_, i) => i !== index) }
          : group
      )
    )
  }

  function handleTodoCopy(groupId: string, index: number) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              items: [
                ...group.items.slice(0, index + 1),
                { ...group.items[index], completed: false },
                ...group.items.slice(index + 1),
              ],
            }
          : group
      )
    )
  }

  const onDragEnd = (result: any) => {
    console.log(result)
    if (!result.destination) return;

    const updatedGroups = [...groups];
    const [removed] = updatedGroups.splice(result.source.index, 1);
    updatedGroups.splice(result.destination.index, 0, removed);

    setGroups(updatedGroups)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Div>
          <GroupInput
            onChange={(e) => setNewGroup(e.target.value)}
            value={newGroup}
            type='text'
            placeholder='Enter Group Name'
          />
          <Button onClick={handleSubmit}>Create</Button>
        </Div>
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='groups' direction='horizontal'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto auto',
                marginTop: '30px',
              }}
            >
              {groups.map((group, index) => (
                <Draggable key={group.id} draggableId={group.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <GroupDiv>
                        <GroupName>
                          <H3>{group.title}</H3>
                          <DeleteGroup onClick={() => handleGroupDelete(group.id)}>
                            delete
                          </DeleteGroup>
                        </GroupName>
                        <Taskside>
                          <Input
                            placeholder='Add ToDo'
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const todo = e.currentTarget.value.trim();
                                if (todo !== '') {
                                  handleTodoSubmit(group.id, todo)
                                  e.currentTarget.value = '';
                                }
                              }
                            }}
                          />
                          {group.items.map((todo, index) => (
                            <TodoBox key={index}>
                              <Leftside>
                                <Checkbox
                                  type='checkbox'
                                  checked={todo.completed}
                                  onChange={() => handleCheckboxChange(group.id, index)}
                                />
                                <H4 style={{ textDecoration: todo.completed ? 'line-through' : 'none',}}>
                                  {todo.text}
                                </H4>
                              </Leftside>
                              <Rightside>
                                <Copy onClick={() => handleTodoCopy(group.id, index)}>copy</Copy>
                                <Delete onClick={() => deleteTodo(group.id, index)}>delete</Delete>
                              </Rightside>
                            </TodoBox>
                          ))}
                        </Taskside>
                      </GroupDiv>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default DisplayGroups;
