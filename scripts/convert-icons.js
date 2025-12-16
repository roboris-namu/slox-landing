const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE_IMAGE = '/Users/roboris/Desktop/bull-mascot.png';
const OUTPUT_DIR = path.join(__dirname, '../public/icons');

// 필요한 아이콘 사이즈들
const SIZES = [512, 384, 192, 152, 144, 128, 96, 72, 32, 16];

async function generateIcons() {
  console.log('🐂 SLOX 황소 마스코트 아이콘 생성 시작!\n');

  // 원본 이미지 확인
  if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error('❌ 원본 이미지를 찾을 수 없습니다:', SOURCE_IMAGE);
    process.exit(1);
  }

  // 출력 폴더 확인
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 각 사이즈로 변환
  for (const size of SIZES) {
    const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);
    
    await sharp(SOURCE_IMAGE)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✅ icon-${size}x${size}.png 생성 완료`);
  }

  // Apple Touch Icon (180x180)
  await sharp(SOURCE_IMAGE)
    .resize(180, 180, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png 생성 완료');

  // Favicon 사이즈들
  await sharp(SOURCE_IMAGE)
    .resize(32, 32, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicon-32x32.png'));
  console.log('✅ favicon-32x32.png 생성 완료');

  await sharp(SOURCE_IMAGE)
    .resize(16, 16, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicon-16x16.png'));
  console.log('✅ favicon-16x16.png 생성 완료');

  // favicon.ico 대신 favicon.png 생성 (public 폴더에)
  await sharp(SOURCE_IMAGE)
    .resize(48, 48, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(__dirname, '../public/favicon.png'));
  console.log('✅ favicon.png 생성 완료');

  // 512 사이즈를 메인 icon.png로도 복사
  await sharp(SOURCE_IMAGE)
    .resize(512, 512, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'icon.png'));
  console.log('✅ icon.png (512x512) 생성 완료');

  console.log('\n🎉 모든 아이콘 생성 완료!');
  console.log('📁 위치:', OUTPUT_DIR);
}

generateIcons().catch(console.error);

