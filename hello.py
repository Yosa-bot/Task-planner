import json
import js

def load_data():
    try:
        data = js.localStorage.getItem('task_planner_data')
        if not data:
            return {'tasks': []}
        return json.loads(data)
    except:
        return {'tasks': []}

def save_data(data):
    try:
        js.localStorage.setItem('task_planner_data', json.dumps(data))
        return True
    except:
        return False

def add_task(title, priority, category):
    data = load_data()
    data['tasks'].append({
        'title': title,
        'priority': priority,
        'category': category,
        'done': False
    })
    save_data(data)
    return "✅ Task added!"

def get_tasks(category_filter=""):
    data = load_data()
    tasks = data['tasks']
    if category_filter:
        tasks = [task for task in tasks if task['category'] == category_filter]
    # Sort by priority: High > Medium > Low
    priority_order = {'High': 1, 'Medium': 2, 'Low': 3}
    return sorted(tasks, key=lambda x: priority_order.get(x['priority'], 3))

def mark_task_done(index):
    data = load_data()
    if 0 <= index < len(data['tasks']):
        data['tasks'][index]['done'] = True
        save_data(data)
        return "✅ Task marked as done."
    return "❌ Invalid task index."

def get_categories():
    data = load_data()
    categories = set(task['category'] for task in data['tasks'])
    return sorted(list(categories))