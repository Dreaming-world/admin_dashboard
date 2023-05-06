# -*- encoding: utf-8 -*-
"""
@File    :   app.py.py   
@Contact :   lxf
@License :   (C)Copyright 2018-2021
 
@Modify Time      @Author    @Version    @Desciption
------------      -------    --------    -----------
2023/5/2 18:48   lxf      1.0         None
"""

from flask import Flask, request, jsonify
from flask import render_template

MAX_NUM = 12
IDS = [i for i in range(80)]

app = Flask(__name__)


@app.route("/")
def index_show():
    return render_template("index.html")


@app.route("/intent")
def intent_show():
    return render_template("intent.html")


@app.route("/get_intent_message/<intent_id>")
def get_intent_message(intent_id):
    print(intent_id)
    intent_id, index = intent_id.split("_")
    index = int(index)
    ids = IDS[index * MAX_NUM:(index + 1) * MAX_NUM] # 当前要展示的数据

    # 分页展示
    if len(IDS) % MAX_NUM == 0:
        max_page = len(IDS) // MAX_NUM
    else:
        max_page = len(IDS) // MAX_NUM + 1

    pre_index = index - 1 if index - 1 >= 0 else 0
    next_index = index + 1 if index + 1 <= max_page - 1 else index

    # 展示的分页demo
    if max_page <= 5:
        show_page_index = [str(i) for i in range(max_page)]
    elif index <= 1:
        show_page_index = ["0", "1", "2", '...', str(max_page - 1)]
    elif index + 2 >= max_page - 1:
        show_page_index = [str(max_page - 5), str(max_page - 4), str(max_page - 3), str(max_page - 2),
                           str(max_page - 1)]
    else:
        show_page_index = [str(index - 1), str(index), str(index + 1), '...', str(max_page - 1)]
    print(show_page_index)
    return render_template("table.html", ids=ids, intent_id=intent_id, max_page=str(max_page - 1),
                           next_index=str(next_index),
                           current_index=str(index),
                           pre_index=str(pre_index),
                           show_page_index=show_page_index)


@app.route('/get_result', methods=['POST'])
def get_result():
    print(request)
    message = request.form['user_query']
    # 在这里可以将 message 发送到其他地方
    return '已发送消息：' + message


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5003)
