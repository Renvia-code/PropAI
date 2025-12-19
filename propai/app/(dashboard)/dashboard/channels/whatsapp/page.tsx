"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, ExternalLink, RefreshCw, Smartphone, Globe, ShieldCheck, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockTemplates } from "@/lib/data/mock-properties";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function WhatsAppChannelPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background">
       <div className="flex items-center justify-between p-6 border-b">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/channels')}>
               <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
               <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
               </div>
               <div>
                  <h1 className="text-xl font-semibold flex items-center gap-2">
                     WhatsApp Business API
                     <Badge className="bg-green-500 hover:bg-green-600 border-0">Connected</Badge>
                  </h1>
                  <p className="text-sm text-muted-foreground">+91 98765 43210 • PropAI Real Estate</p>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Button variant="outline">
               <RefreshCw className="mr-2 h-4 w-4" /> Sync Templates
            </Button>
            <Button variant="destructive" size="sm">Disconnect</Button>
         </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
         <Tabs defaultValue="settings" className="max-w-5xl mx-auto space-y-6">
            <TabsList className="bg-muted/50 p-1">
               <TabsTrigger value="settings">Settings</TabsTrigger>
               <TabsTrigger value="templates">Templates</TabsTrigger>
               <TabsTrigger value="automation">Automation</TabsTrigger>
               <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-base">Business Profile</CardTitle>
                        <CardDescription>How your business appears on WhatsApp</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label>Display Name</Label>
                           <Input defaultValue="PropAI Real Estate" />
                        </div>
                         <div className="space-y-2">
                           <Label>About</Label>
                           <Textarea defaultValue="Leading AI-powered real estate platform. Helping you find your dream home." />
                        </div>
                        <div className="space-y-2">
                           <Label>Address</Label>
                           <Input defaultValue="Cyber City, Gurgaon, India" />
                        </div>
                        <div className="space-y-2">
                           <Label>Website</Label>
                           <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground text-sm">
                                 https://
                              </span>
                              <Input className="rounded-l-none" defaultValue="propai.com" />
                           </div>
                        </div>
                        <Button className="w-full">Save Profile</Button>
                     </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-base">Connection Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900 rounded-lg">
                              <div className="flex items-center gap-3">
                                 <ShieldCheck className="h-5 w-5 text-green-600" />
                                 <div>
                                    <p className="font-medium text-sm">Connection Quality</p>
                                    <p className="text-xs text-muted-foreground">High (Tier 2)</p>
                                 </div>
                              </div>
                              <div className="flex gap-1">
                                 {[1,2,3,4,5].map(i => (
                                    <div key={i} className={`h-2 w-2 rounded-full ${i <= 4 ? 'bg-green-500' : 'bg-gray-200'}`} />
                                 ))}
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                 <p className="text-muted-foreground">WABA ID</p>
                                 <p className="font-mono bg-muted p-1 rounded px-2 mt-1">1234567890123</p>
                              </div>
                              <div>
                                 <p className="text-muted-foreground">Phone ID</p>
                                 <p className="font-mono bg-muted p-1 rounded px-2 mt-1">9876543210987</p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                     
                      <Card>
                        <CardHeader>
                           <CardTitle className="text-base">Messaging Limits</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                 <span>Free Conversations</span>
                                 <span className="font-medium">850 / 1000</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500 w-[85%]" />
                              </div>
                              <p className="text-xs text-muted-foreground">Resets on 1st of every month</p>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
               <div className="flex justify-between items-center">
                  <div>
                     <h3 className="text-lg font-medium">Message Templates</h3>
                     <p className="text-sm text-muted-foreground">Templates required for initiating conversations</p>
                  </div>
                  <Button>
                     <Plus className="mr-2 h-4 w-4" /> Create Template
                  </Button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTemplates.map(template => (
                     <Card key={template.id} className="flex flex-col">
                        <CardHeader className="pb-3">
                           <div className="flex justify-between items-start">
                              <Badge variant="outline" className="font-mono text-xs">{template.name}</Badge>
                              <Badge className={
                                 template.status === 'approved' ? 'bg-green-500 hover:bg-green-600 border-0' : 
                                 template.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600 border-0' : 
                                 'bg-red-500 hover:bg-red-600 border-0'
                              }>
                                 {template.status}
                              </Badge>
                           </div>
                           <p className="text-xs text-muted-foreground mt-2 capitalize">{template.category} • {template.language}</p>
                        </CardHeader>
                        <CardContent className="flex-1">
                           <div className="bg-muted/50 p-3 rounded-md text-sm whitespace-pre-wrap font-mono text-xs">
                              {template.content}
                           </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-end gap-2">
                           <Button variant="ghost" size="sm">Edit</Button>
                           <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
                        </CardFooter>
                     </Card>
                  ))}
               </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
               <Card>
                  <CardHeader>
                     <div className="flex items-center justify-between">
                        <div>
                           <CardTitle className="text-base flex items-center gap-2">
                              <Smartphone className="h-5 w-5 text-blue-500" />
                              AI Auto-Response
                           </CardTitle>
                           <CardDescription>Let AI handle initial lead qualification on WhatsApp</CardDescription>
                        </div>
                        <Switch defaultChecked />
                     </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="space-y-0.5">
                              <Label className="text-base">Working Hours Only</Label>
                              <p className="text-sm text-muted-foreground">Only reply when agents are offline</p>
                           </div>
                           <Switch />
                        </div>
                        <Separator />
                        <div className="space-y-3">
                           <Label>Response Delay (Natural Feel)</Label>
                           <div className="flex items-center gap-4">
                              <input type="range" className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer" />
                              <span className="text-sm font-mono w-12">3s</span>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label>Human Handoff Trigger</Label>
                           <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                              <option>When lead asks for human</option>
                              <option>When sentiment is negative</option>
                              <option>When budget exceeds ₹2 Cr</option>
                           </select>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
    </div>
  );
}
