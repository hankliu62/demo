// 问题：路径合并，得到绝对路径 ('C:\Windows\System32\drivers\etc\..\.\..\hosts' => 'C:\Windows\System32\hosts')
// 思路：采用队列的方式，先按照'\'分割，遇到文件夹，push；遇到'..'，pop；遇到空或者'.'，舍弃。
module.exports = function (folderPath) {
  const folders = [];
  const relativeFolders = folderPath.split('\\');
  for (const folder of relativeFolders) {
    if (folder === '..') {
      folders.pop();
    } else if (!folder || folder === '.') {
      continue;
    } else {
      folders.push(folder);
    }
  }

  return folders.join('\\');
}
