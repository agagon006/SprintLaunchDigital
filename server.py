import http.server
import socketserver
import os

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

PORT = 5000
handler = NoCacheHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), handler)

print(f"Serving at port {PORT} with cache control...")
httpd.serve_forever()
