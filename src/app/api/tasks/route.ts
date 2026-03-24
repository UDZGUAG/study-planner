import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the absolute path to the data file
const dataFilePath = path.join(process.cwd(), 'src', 'app', 'tasks', 'data', 'tasks.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading tasks.json:', error);
    return NextResponse.json(
      { error: 'Failed to read tasks data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newTask = await request.json();
    
    // Read the existing tasks
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // The data is formatted as {"tasks": [...]}
    const tasks = data.tasks || [];
    
    // Auto-increment the ID
    const newId = tasks.length > 0 ? Math.max(...tasks.map((t: any) => t.id || 0)) + 1 : 1;
    
    const taskToAdd = {
      id: newId,
      ...newTask,
      completed: false // Default to false if not provided
    };
    
    tasks.push(taskToAdd);
    
    // Write the updated array back to tasks.json
    await fs.writeFile(dataFilePath, JSON.stringify({ tasks }, null, 4), 'utf8');
    
    return NextResponse.json(taskToAdd, { status: 201 });
  } catch (error) {
    console.error('Error writing to tasks.json:', error);
    return NextResponse.json(
      { error: 'Failed to add the new task' },
      { status: 500 }
    );
  }
}
