const fs = require('fs');
const path = require('path');

function copyFolderRecursiveSync(source, target) {
  // 创建目标文件夹
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  // 遍历源文件夹中的每个文件或子文件夹
  fs.readdirSync(source).forEach((file) => {
    // 构造源文件/文件夹的完整路径
    const sourcePath = path.join(source, file);

    // 构造目标文件/文件夹的完整路径
    const targetPath = path.join(target, file);

    // 获取文件/文件夹的详细信息
    const stat = fs.statSync(sourcePath);

    if (stat.isFile()) {
      // 如果是文件，则直接复制文件
      fs.copyFileSync(sourcePath, targetPath);
    } else if (stat.isDirectory()) {
      // 如果是文件夹，则递归复制文件夹
      copyFolderRecursiveSync(sourcePath, targetPath);
    }
  });
}

// 复制文件夹
const sourcePath = path.join(__dirname, 'css');
const destinationPath = path.join(__dirname, 'public/css');

copyFolderRecursiveSync(sourcePath, destinationPath);

console.log(`Folder copied from "${sourcePath}" to "${destinationPath}"`);
