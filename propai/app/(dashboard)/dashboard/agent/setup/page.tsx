"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Bot, 
  Save, 
  MessageSquare,
  Globe,
  Settings,
  Sparkles,
  User
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AgentSetupPage() {
  const router = useRouter();
  const [agentName, setAgentName] = React.useState("Priya");
  const [tone, setTone] = React.useState("friendly");
  const [responseLength, setResponseLength] = React.useState(50);
  const [greeting, setGreeting] = React.useState("Hi! I'm {{name}}, your PropAI assistant. How can I help you find your dream property today?");
  const [instructions, setInstructions] = React.useState(`- Always ask for budget preference early in the conversation
- Recommend site visits for leads showing serious interest
- Never share exact unit availability, ask them to call for latest info
- Be extra helpful and patient with first-time home buyers
- If someone asks about loan options, mention we have banking partners`);

  const previewMessages = [
    { role: "assistant", content: greeting.replace("{{name}}", agentName) },
    { role: "user", content: "I'm looking for 3BHK apartments in Gurgaon" },
    { role: "assistant", content: tone === "professional" 
      ? "Certainly. We have several 3BHK options in Gurgaon. May I know your budget range to provide you with the most suitable options?"
      : "I'd love to help you find the perfect 3BHK! 🏠 We have some beautiful options in Gurgaon. What's your budget range? This will help me show you the best matches!"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/agent')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Configure AI Agent</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Customize how your AI interacts with leads</p>
            </div>
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="container max-w-6xl mx-auto p-6">
          <Tabs defaultValue="personality" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="personality" className="gap-2">
                <User className="h-4 w-4" /> Personality
              </TabsTrigger>
              <TabsTrigger value="behavior" className="gap-2">
                <Settings className="h-4 w-4" /> Behavior
              </TabsTrigger>
              <TabsTrigger value="languages" className="gap-2">
                <Globe className="h-4 w-4" /> Languages
              </TabsTrigger>
              <TabsTrigger value="handoff" className="gap-2">
                <MessageSquare className="h-4 w-4" /> Handoff Rules
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personality" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Configuration */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Agent Identity</CardTitle>
                      <CardDescription>Define your AI assistant's personality</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Agent Name</Label>
                        <Input 
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                          placeholder="e.g., Priya, Alex, Sam"
                        />
                        <p className="text-xs text-muted-foreground">This is how your AI will introduce itself</p>
                      </div>

                      <div className="space-y-3">
                        <Label>Tone</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: "professional", label: "Professional", desc: "Formal and business-like" },
                            { value: "friendly", label: "Friendly", desc: "Warm and approachable" },
                            { value: "casual", label: "Casual", desc: "Relaxed and conversational" },
                          ].map((option) => (
                            <div
                              key={option.value}
                              onClick={() => setTone(option.value)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                tone === option.value 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-muted hover:border-muted-foreground/30'
                              }`}
                            >
                              <p className="font-medium text-sm">{option.label}</p>
                              <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Label>Response Length</Label>
                          <span className="text-sm text-muted-foreground">
                            {responseLength < 33 ? 'Brief' : responseLength < 66 ? 'Balanced' : 'Detailed'}
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={responseLength}
                          onChange={(e) => setResponseLength(parseInt(e.target.value))}
                          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Brief</span>
                          <span>Detailed</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Greeting Message</Label>
                        <Textarea 
                          value={greeting}
                          onChange={(e) => setGreeting(e.target.value)}
                          rows={3}
                          placeholder="Hi! I'm {{name}}, your assistant..."
                        />
                        <p className="text-xs text-muted-foreground">Use {"{{name}}"} to insert agent name</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Custom Instructions</CardTitle>
                      <CardDescription>Add specific guidelines for your AI</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        rows={8}
                        placeholder="- Always ask for budget early&#10;- Recommend site visits for serious inquiries&#10;- Be patient with first-time buyers"
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-2">One instruction per line, starting with a dash</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Live Preview */}
                <div className="lg:sticky lg:top-6 space-y-4">
                  <Card className="border-2 border-dashed">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Live Preview
                      </CardTitle>
                      <CardDescription>See how your AI will respond</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/30 rounded-lg p-4 space-y-4 min-h-[400px]">
                        {previewMessages.map((msg, i) => (
                          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'assistant' && (
                              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                                <Bot className="h-4 w-4 text-primary" />
                              </div>
                            )}
                            <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
                              msg.role === 'user' 
                                ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                                : 'bg-background border rounded-tl-sm shadow-sm'
                            }`}>
                              <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full" asChild>
                        <a href="/dashboard/agent">Test Full Conversation</a>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Response Behavior</CardTitle>
                  <CardDescription>Configure how your AI handles conversations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-qualify leads</Label>
                      <p className="text-sm text-muted-foreground">Automatically score and categorize leads based on conversation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">Book site visits</Label>
                      <p className="text-sm text-muted-foreground">Allow AI to schedule property viewings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">Send property brochures</Label>
                      <p className="text-sm text-muted-foreground">Share relevant documents during conversation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">Collect contact details</Label>
                      <p className="text-sm text-muted-foreground">Ask for email and phone if not provided</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="languages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Language Settings</CardTitle>
                  <CardDescription>Configure which languages your AI can communicate in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Primary Language</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="th">Thai</option>
                    </select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Additional Languages</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Hindi", "Tamil", "Telugu", "Marathi", "Bengali", "Thai"].map((lang) => (
                        <div key={lang} className="flex items-center gap-2 p-3 rounded-lg border">
                          <Switch id={lang} />
                          <Label htmlFor={lang} className="cursor-pointer">{lang}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-detect language</Label>
                      <p className="text-sm text-muted-foreground">Automatically switch language based on user's message</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="handoff" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Human Handoff Rules</CardTitle>
                  <CardDescription>Define when AI should transfer to a human agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">When user asks for human</Label>
                      <p className="text-sm text-muted-foreground">Transfer when keywords like "talk to human", "real person" are detected</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">Negative sentiment detected</Label>
                      <p className="text-sm text-muted-foreground">Transfer when user seems frustrated or upset</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">High-value lead</Label>
                      <p className="text-sm text-muted-foreground">Transfer when budget exceeds ₹2 Crore</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">Complex queries</Label>
                      <p className="text-sm text-muted-foreground">Transfer when AI confidence is below 70%</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Custom handoff keywords</Label>
                    <Input placeholder="manager, complaint, urgent, price negotiation" />
                    <p className="text-xs text-muted-foreground">Comma-separated keywords that trigger handoff</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
