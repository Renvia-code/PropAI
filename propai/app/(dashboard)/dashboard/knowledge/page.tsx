"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockKnowledgeSources, mockUploadedFiles } from "@/lib/data/mock-dashboard";
import { 
  Plus, 
  FileText, 
  Database, 
  Globe, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw,
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  Sparkles,
  Search,
  Send
} from "lucide-react";
import Link from "next/link";

export default function KnowledgePage() {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case "files": return <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case "database": return <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
      case "website": return <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />;
      case "qa": return <HelpCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "trained":
        return <Badge className="bg-green-500 hover:bg-green-600 border-0"><CheckCircle2 className="h-3 w-3 mr-1" /> Trained</Badge>;
      case "syncing":
        return <Badge className="bg-blue-500 hover:bg-blue-600 border-0"><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Syncing</Badge>;
      case "crawling":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 border-0"><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Crawling</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "error":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const sampleQuestions = [
    "What 3BHK options are available under ₹1.5 Cr?",
    "Does Cyber City Heights have a swimming pool?",
    "What is the possession date for Green Valley?",
    "What are the payment plan options?",
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            <p className="text-muted-foreground mt-1">Train your AI with property data and business information</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Source
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-muted/5">
        <div className="p-6 space-y-6">
          
          {/* Training Status */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-100 dark:border-green-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                    <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">Training Status</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Last updated 2 hours ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white dark:bg-background">
                  <RefreshCw className="mr-2 h-4 w-4" /> Retrain Now
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-800 dark:text-green-200">Training Complete</span>
                  <span className="font-medium text-green-900 dark:text-green-100">85%</span>
                </div>
                <div className="h-3 bg-green-200 dark:bg-green-900 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: '85%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Sources */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Knowledge Sources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockKnowledgeSources.map((source) => (
                <Card key={source.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${
                        source.type === 'files' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        source.type === 'database' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        source.type === 'website' ? 'bg-green-100 dark:bg-green-900/30' :
                        'bg-orange-100 dark:bg-orange-900/30'
                      }`}>
                        {getSourceIcon(source.type)}
                      </div>
                      {getStatusBadge(source.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <h3 className="font-semibold text-lg">{source.name}</h3>
                    <p className="text-2xl font-bold mt-1">{source.count}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {source.type === 'files' ? 'documents' : 
                       source.type === 'database' ? 'records' :
                       source.type === 'website' ? 'pages' : 'pairs'}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="w-full group-hover:bg-muted" asChild>
                      <Link href={`/dashboard/knowledge/${source.type}`}>
                        Manage <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recently Added</CardTitle>
              <CardDescription>Latest sources added to knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUploadedFiles.slice(0, 3).map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted p-2 rounded">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size} • {file.uploadedAt}</p>
                      </div>
                    </div>
                    {getStatusBadge(file.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Knowledge */}
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Test Your Knowledge Base
              </CardTitle>
              <CardDescription>Ask a question to see how AI will respond</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Ask a question about your properties..." className="flex-1" />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Sample questions AI can answer:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((q, i) => (
                    <Button key={i} variant="outline" size="sm" className="h-auto py-1.5 px-3 text-xs font-normal">
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </ScrollArea>
    </div>
  );
}
