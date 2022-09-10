import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AttachmentConstants as Constants } from '../constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  @Input()
  allowedFileExtensions: string[] = [];

  @ViewChild('fileInput', { static: false })
  fileInput: ElementRef | undefined;

  errorMessage = '';
  successMessage = '';

  constructor(private httpClient: HttpClient) {}

  onSelectFile() {
    this.fileInput?.nativeElement.click();
  }

  attachFile(event: any) {
    const file: File = event.target.files?.[0];
    if (file && this.isValid(file)) {
      this.errorMessage = '';
      const formData = new FormData();
      formData.append('file', file, file.name);
      const uploadFileHeaders = new HttpHeaders({
        Accept: `application/json, text/plain, */*`,
      });
      this.httpClient
        .post('/api/file-upload/upload', formData, {
          headers: uploadFileHeaders,
        })
        .subscribe({
          next: (response) => {
            this.successMessage = `Document ${file.name} is uploaded successfully`;
          },
          error: (error) => {
            this.errorMessage = `failed to upload document.`;
            return error;
          },
        });
    }
  }

  isValid(file: File) {
    if (file.size > Constants.maxFileSizeBinary) {
      this.errorMessage = Constants.fileSizeErrorMessage;
      return false;
    }

    if (
      !Constants.allowedFileExtensions.includes(
        this.getExtension(file.name.toLowerCase())
      )
    ) {
      this.errorMessage = Constants.fileTypeErrorMessage;
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  getExtension(filename: string) {
    return filename.substring(filename?.lastIndexOf('.') + 1);
  }

  get acceptedFileExtensions() {
    return this.allowedFileExtensions.map((ext) => `.${ext}`).join(',');
  }
}
