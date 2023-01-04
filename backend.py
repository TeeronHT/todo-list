from flask import Flask, request, jsonify

app = Flask(__name__)

tasks = []

@app.route('/tasks', methods=['GET', 'POST'])
def task_route():
  if request.method == 'GET':
    # Return a list of tasks
    return jsonify(tasks)
  elif request.method == 'POST':
    # Add a new task
    task = request.form['task']
    tasks.append(task)
    return jsonify({'success': True, 'task': task}), 201

if __name__ == '__main__':
  app.run()
