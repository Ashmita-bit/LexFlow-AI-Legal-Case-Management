# PowerShell script to test file upload to case files endpoint (PowerShell 5.1 compatible)
$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

# Read the test file content
$fileContent = Get-Content -Path "test_upload.txt" -Raw

# Build the multipart form data body
$body = (
    "--$boundary$LF" +
    "Content-Disposition: form-data; name=`"files`"; filename=`"test_upload.txt`"$LF" +
    "Content-Type: text/plain$LF$LF" +
    $fileContent + "$LF" +
    "--$boundary$LF" +
    "Content-Disposition: form-data; name=`"uploadedBy`"$LF$LF" +
    "testuser$LF" +
    "--$boundary--$LF"
)

# Make the request with -UseBasicParsing to avoid security prompts
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/cases/1/files" -Method POST -ContentType "multipart/form-data; boundary=$boundary" -Body $body -UseBasicParsing
    Write-Host "Upload successful!"
    Write-Host "Status Code:" $response.StatusCode
    Write-Host "Response:" $response.Content
} catch {
    Write-Host "Upload failed!"
    Write-Host "Error:" $_.Exception.Message
    if ($_.Exception.Response) {
        Write-Host "Status Code:" $_.Exception.Response.StatusCode
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body:" $responseBody
    }
}
