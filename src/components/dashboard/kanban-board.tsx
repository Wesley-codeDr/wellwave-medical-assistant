'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  User, 
  Heart, 
  Thermometer,
  Activity,
  Plus,
  GripVertical
} from 'lucide-react';
import { Column, Task, getInitialColumns } from '@/lib/mock-data';

interface KanbanBoardProps {
  onTaskClick?: (task: Task) => void;
  onCreateTask?: () => void;
}

// Componente Sortable para tarefas
function SortableTaskCard({ task, onTaskClick }: { task: Task; onTaskClick?: (task: Task) => void }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critica':
        return 'bg-red-500 text-white';
      case 'alta':
        return 'bg-orange-500 text-white';
      case 'media':
        return 'bg-yellow-500 text-black';
      case 'baixa':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'critica':
        return <AlertTriangle className="h-3 w-3" />;
      case 'alta':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getVitalSignsColor = (value: number, type: 'hr' | 'temp' | 'spo2') => {
    switch (type) {
      case 'hr':
        return value > 100 ? 'text-red-600' : value < 60 ? 'text-blue-600' : 'text-green-600';
      case 'temp':
        return value > 37.5 ? 'text-red-600' : value < 36 ? 'text-blue-600' : 'text-green-600';
      case 'spo2':
        return value < 95 ? 'text-red-600' : 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onTaskClick?.(task)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium line-clamp-2">
            {task.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={`${getPriorityColor(task.priority)}`}>
              {getPriorityIcon(task.priority)}
              <span className="ml-1 capitalize">{task.priority}</span>
            </Badge>
            {isMounted && (
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
              >
                <GripVertical className="h-3 w-3 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-xs">
            {task.syndrome}
          </Badge>
          <span>•</span>
          <span>{task.patientAge} anos, {task.patientGender}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {task.vitalSigns && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {task.vitalSigns.bloodPressure && (
              <div className="flex items-center gap-1 text-xs">
                <Activity className="h-3 w-3 text-blue-600" />
                <span className={getVitalSignsColor(parseInt(task.vitalSigns.bloodPressure.split('/')[0]), 'hr')}>
                  {task.vitalSigns.bloodPressure}
                </span>
              </div>
            )}
            {task.vitalSigns.heartRate && (
              <div className="flex items-center gap-1 text-xs">
                <Heart className="h-3 w-3 text-red-600" />
                <span className={getVitalSignsColor(task.vitalSigns.heartRate, 'hr')}>
                  {task.vitalSigns.heartRate} bpm
                </span>
              </div>
            )}
            {task.vitalSigns.temperature && (
              <div className="flex items-center gap-1 text-xs">
                <Thermometer className="h-3 w-3 text-orange-600" />
                <span className={getVitalSignsColor(task.vitalSigns.temperature, 'temp')}>
                  {task.vitalSigns.temperature}°C
                </span>
              </div>
            )}
            {task.vitalSigns.oxygenSaturation && (
              <div className="flex items-center gap-1 text-xs">
                <Activity className="h-3 w-3 text-green-600" />
                <span className={getVitalSignsColor(task.vitalSigns.oxygenSaturation, 'spo2')}>
                  {task.vitalSigns.oxygenSaturation}%
                </span>
              </div>
            )}
          </div>
        )}

        {task.scores && (
          <div className="flex gap-2 mb-3">
            {task.scores.heart && (
              <Badge variant="secondary" className="text-xs">
                HEART: {task.scores.heart}
              </Badge>
            )}
            {task.scores.curb65 && (
              <Badge variant="secondary" className="text-xs">
                CURB-65: {task.scores.curb65}
              </Badge>
            )}
            {task.scores.qsofa && (
              <Badge variant="secondary" className="text-xs">
                qSOFA: {task.scores.qsofa}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatTime(task.createdAt)}</span>
          </div>
          {task.dueAt && (
            <div className="flex items-center gap-1 text-orange-600">
              <Clock className="h-3 w-3" />
              <span>Reavaliação: {formatTime(task.dueAt)}</span>
            </div>
          )}
        </div>

        {task.notes && (
          <div className="mt-2 p-2 bg-muted rounded text-xs">
            {task.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function KanbanBoard({ onTaskClick, onCreateTask }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(getInitialColumns());
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap(col => col.tasks)
      .find(task => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Encontrar a coluna de origem
    const activeColumn = columns.find(col => 
      col.tasks.some(task => task.id === activeId)
    );
    
    if (!activeColumn) return;

    // Se está sendo arrastado sobre uma coluna
    if (overId.startsWith('column-')) {
      const newStatus = overId.replace('column-', '') as Task['status'];
      
      setColumns(prevColumns => 
        prevColumns.map(col => {
          if (col.id === activeColumn.id) {
            // Remover da coluna atual
            return {
              ...col,
              tasks: col.tasks.filter(task => task.id !== activeId)
            };
          }
          if (col.id === newStatus) {
            // Adicionar à nova coluna
            const task = activeColumn.tasks.find(task => task.id === activeId);
            if (task) {
              return {
                ...col,
                tasks: [...col.tasks, { ...task, status: newStatus, updatedAt: new Date() }]
              };
            }
          }
          return col;
        })
      );
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Se está sendo arrastado sobre uma tarefa
    if (overId !== activeId) {
      const activeColumn = columns.find(col => 
        col.tasks.some(task => task.id === activeId)
      );
      const overColumn = columns.find(col => 
        col.tasks.some(task => task.id === overId)
      );

      if (activeColumn && overColumn && activeColumn.id !== overColumn.id) {
        setColumns(prevColumns => 
          prevColumns.map(col => {
            if (col.id === activeColumn.id) {
              return {
                ...col,
                tasks: col.tasks.filter(task => task.id !== activeId)
              };
            }
            if (col.id === overColumn.id) {
              const activeTask = activeColumn.tasks.find(task => task.id === activeId);
              if (activeTask) {
                return {
                  ...col,
                  tasks: [...col.tasks, { ...activeTask, status: col.id, updatedAt: new Date() }]
                };
              }
            }
            return col;
          })
        );
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {column.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {column.tasks.length}
                    </Badge>
                    {column.id === 'entrada' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={onCreateTask}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                {column.wipLimit && (
                  <div className="text-xs text-muted-foreground">
                    Limite: {column.wipLimit}
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div id={`column-${column.id}`} className="min-h-[100px]">
                    {column.tasks.length === 0 ? (
                      <div className="text-center text-muted-foreground text-sm py-8">
                        Nenhuma tarefa
                      </div>
                    ) : (
                      column.tasks.map((task) => (
                        <SortableTaskCard 
                          key={task.id} 
                          task={task} 
                          onTaskClick={onTaskClick}
                        />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {column.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {column.tasks.length}
                    </Badge>
                    {column.id === 'entrada' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={onCreateTask}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                {column.wipLimit && (
                  <div className="text-xs text-muted-foreground">
                    Limite: {column.wipLimit}
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <SortableContext
                    items={column.tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div id={`column-${column.id}`} className="min-h-[100px]">
                      {column.tasks.length === 0 ? (
                        <div className="text-center text-muted-foreground text-sm py-8">
                          Nenhuma tarefa
                        </div>
                      ) : (
                        column.tasks.map((task) => (
                          <SortableTaskCard 
                            key={task.id} 
                            task={task} 
                            onTaskClick={onTaskClick}
                          />
                        ))
                      )}
                    </div>
                  </SortableContext>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <SortableTaskCard task={activeTask} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
