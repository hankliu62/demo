import sys

print('------------------python import mode-------------------')
print('命令行参数为:')
for i in sys.argv:
  print(i)
print('\npython路径为: ', sys.path)