"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { mockUploadedFiles } from "@/lib/data/mock-dashboard";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  File,
  Trash2,
  RefreshCw,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function KnowledgeFilesPage() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-5 w-5 text-red-500" />;
      case "xlsx": case "csv": return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case "docx": return <FileText className="h-5 w-5 text-blue-500" />;
      default: return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "trained":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0"><CheckCircle2 className="h-3 w-3 mr-1" /> Trained</Badge>;
      case "training":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0"><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Training</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "failed":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === mockUploadedFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(mockUploadedFiles.map(f => f.id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/knowledge')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Files</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Upload documents to train your AI</p>
            </div>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload Files
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-muted/5">
        <div className="p-6 space-y-6">
          
          {/* Upload Zone */}
          <Card 
            className={`border-2 border-dashed transition-colors cursor-pointer ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
          >
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className={`p-4 rounded-full mb-4 transition-colors ${
                isDragging ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Upload className={`h-8 w-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <h3 className="font-semibold text-lg">Drag and drop files here</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">or click to browse</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="font-normal">PDF</Badge>
                <Badge variant="outline" className="font-normal">DOCX</Badge>
                <Badge variant="outline" className="font-normal">XLSX</Badge>
                <Badge variant="outline" className="font-normal">TXT</Badge>
                <Badge variant="outline" className="font-normal">CSV</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Max size: 25MB per file</p>
            </CardContent>
          </Card>

          {/* File List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Uploaded Files ({mockUploadedFiles.length})</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search files..." className="pl-9 w-64 h-9" />
                </div>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                <span className="text-sm font-medium">{selectedFiles.length} selected</span>
                <Button variant="outline" size="sm" className="h-8">
                  <RefreshCw className="mr-2 h-3 w-3" /> Retrain
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-destructive hover:text-destructive">
                  <Trash2 className="mr-2 h-3 w-3" /> Delete
                </Button>
              </div>
            )}

            <Card>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="p-3 w-10">
                        <Checkbox 
                          checked={selectedFiles.length === mockUploadedFiles.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </th>
                      <th className="p-3 font-medium">File Name</th>
                      <th className="p-3 font-medium">Type</th>
                      <th className="p-3 font-medium">Size</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium">Uploaded</th>
                      <th className="p-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockUploadedFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <Checkbox 
                            checked={selectedFiles.includes(file.id)}
                            onCheckedChange={() => toggleFileSelection(file.id)}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <span className="font-medium text-sm">{file.name}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="uppercase text-[10px] font-mono">
                            {file.type}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{file.size}</td>
                        <td className="p-3">{getStatusBadge(file.status)}</td>
                        <td className="p-3 text-sm text-muted-foreground">{file.uploadedAt}</td>
                        <td className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Preview Content</DropdownMenuItem>
                              <DropdownMenuItem>Retrain</DropdownMenuItem>
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}
