import pandas as pd
import pymysql

# 数据库连接配置
db_config = {
    'host': 'localhost',
    'user': 'root',
    'passwd': '',
    'db': 'poetry',
    'charset': 'utf8mb4'
}

# 读取Excel文件
excel_file = '/Users/daisyli/Downloads/古诗.xlsx'
df = pd.read_excel(excel_file)

# 连接数据库
conn = pymysql.connect(**db_config)
cursor = conn.cursor()

# 遍历DataFrame中的每行
for index, row in df.iterrows():
    # 插入poetry_meta表
    # 使用 .iloc 或者直接通过列名来避免 FutureWarning
    prolog = '' if pd.isnull(row['【序】']) else row['【序】']
    period = '' if pd.isnull(row['【阶段】']) else row['【阶段】']
    print('test value: ', row['【题目】'], row['【朝代】'], row['【作者】'], period, prolog)
    data = (row['【题目】'], row['【朝代】'], row['【作者】'], period, prolog)

    cursor.execute("INSERT INTO poetry_meta (title, dynasty, author, period, prolog) VALUES (%s, %s, %s, %s, %s)", data)

    poetry_meta_id = cursor.lastrowid  # 获取最后插入行的主键ID

    # 遍历每一列，从【1】到【100】
    for i in range(1, 101):
        # 使用`str(i)`来访问列
        content = row.get('【' + str(i) + '】', None)
        print('content: ', i, content)
        if pd.isnull(content):  # 如果内容为空，则停止插入
            break
        cursor.execute('''
            INSERT INTO poetry_content (poetry_meta_id, seq, content)
            VALUES (%s, %s, %s)
        ''', (poetry_meta_id, i, content))

    conn.commit()

# 关闭数据库连接
cursor.close()
conn.close()

print('数据导入完成')
