/**
 * 이미지 URL에서 파일을 다운로드하는 함수
 * @param imageUrl - 다운로드할 이미지의 URL
 * @param fileName - 다운로드될 파일명 (확장자 포함)
 * @returns Promise<boolean> - 다운로드 성공 여부
 */
export async function downloadImage(
  imageUrl: string, 
  fileName?: string
): Promise<boolean> {
  try {
    // 이미지 fetch
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // blob으로 변환
    const blob = await response.blob();
    
    // 파일명이 제공되지 않은 경우 URL에서 추출
    const finalFileName = fileName || extractFileNameFromUrl(imageUrl);
    
    // 다운로드 실행
    downloadBlob(blob, finalFileName);
    
    return true;
  } catch (error) {
    console.error('Image download failed:', error);
    return false;
  }
}

/**
 * Blob 데이터를 파일로 다운로드하는 함수
 * @param blob - 다운로드할 Blob 데이터
 * @param fileName - 파일명
 */
function downloadBlob(blob: Blob, fileName: string): void {
  // blob URL 생성
  const url = URL.createObjectURL(blob);
  
  // 임시 anchor 엘리먼트 생성
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  
  // DOM에 추가하고 클릭
  document.body.appendChild(link);
  link.click();
  
  // 정리
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * URL에서 파일명을 추출하는 함수
 * @param url - 파일 URL
 * @returns 추출된 파일명
 */
function extractFileNameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const fileName = pathname.split('/').pop() || 'image';
    
    // 확장자가 없으면 기본 확장자 추가
    if (!fileName.includes('.')) {
      return `${fileName}.jpg`;
    }
    
    return fileName;
  } catch {
    // URL 파싱 실패 시 기본 파일명 반환
    return `image_${Date.now()}.jpg`;
  }
}

/**
 * 여러 이미지를 순차적으로 다운로드하는 함수
 * @param imageUrls - 다운로드할 이미지 URL 배열
 * @param baseFileName - 기본 파일명 (인덱스가 자동으로 추가됨)
 * @returns Promise<number> - 성공적으로 다운로드된 파일 수
 */
export async function downloadMultipleImages(
  imageUrls: string[],
  baseFileName = 'image'
): Promise<number> {
  let successCount = 0;
  
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const fileName = `${baseFileName}_${i + 1}.jpg`;
    
    const success = await downloadImage(url, fileName);
    if (success) {
      successCount++;
    }
    
    // 다운로드 간 짧은 지연 (브라우저 부하 방지)
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return successCount;
}

/**
 * 이미지 다운로드 with 진행률 콜백
 * @param imageUrl - 다운로드할 이미지 URL
 * @param fileName - 파일명
 * @param onProgress - 진행률 콜백 함수 (0-100)
 * @returns Promise<boolean> - 다운로드 성공 여부
 */
export async function downloadImageWithProgress(
  imageUrl: string,
  fileName?: string,
  onProgress?: (progress: number) => void
): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentLength = response.headers.get('content-length');
    const total = contentLength ? parseInt(contentLength, 10) : 0;
    
    if (!response.body) {
      throw new Error('Response body is null');
    }
    
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      chunks.push(value);
      received += value.length;
      
      // 진행률 콜백 호출
      if (onProgress && total > 0) {
        const progress = Math.round((received / total) * 100);
        onProgress(progress);
      }
    }
    
    // 모든 청크를 하나의 Uint8Array로 결합
    const allChunks = new Uint8Array(received);
    let position = 0;
    for (const chunk of chunks) {
      allChunks.set(chunk, position);
      position += chunk.length;
    }
    
    const blob = new Blob([allChunks]);
    const finalFileName = fileName || extractFileNameFromUrl(imageUrl);
    
    downloadBlob(blob, finalFileName);
    
    return true;
  } catch (error) {
    console.error('Image download with progress failed:', error);
    return false;
  }
}