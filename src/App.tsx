import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Button } from './components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { useToast } from './components/ui/use-toast'

// Define writing style options
const WRITING_STYLES = [
  { id: 'tim-ferriss', name: 'Super Writer GPT (Tim Ferriss Style)' },
  { id: 'tim-ferriss-james-clear', name: 'Super Writer GPT (Tim Ferriss Style) + James Clear (20%)' },
  { id: 'shane-parrish', name: 'Insight Writer GPT (Shane Parrish Style)' },
  { id: 'mark-manson', name: 'Brutally Honest GPT (Mark Manson Style)' },
  { id: 'david-perell', name: 'Idea Curator GPT (David Perell Style)' },
]

// Mock API function to simulate content generation
const generateContent = async (prompt: string, style: string): Promise<string> => {
  // In a real app, this would call an API endpoint
  console.log(`Generating content with style: ${style} and prompt: ${prompt}`)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Return mock content based on style
  switch (style) {
    case 'tim-ferriss':
      return `# Tim Ferriss Style\n\nI've been exploring ${prompt} for the past 6 months, and here's what I've found: the 80/20 principle applies perfectly. About 20% of the approaches produce 80% of the results.\n\nThree things to consider:\n- What if you started with the end in mind?\n- Have you tested minimum effective doses?\n- Could you eliminate before you optimize?`;
    
    case 'tim-ferriss-james-clear':
      return `# Tim Ferriss + James Clear Style\n\nI've been exploring ${prompt} for months, and discovered something interesting.\n\nThe most successful people don't have more discipline. They have better systems.\n\nHere's a simple 2-step process I've developed:\n1. Reduce friction for what you want to do\n2. Increase friction for what you don't want to do\n\nSmall habits, remarkable results.`;
    
    case 'shane-parrish':
      return `# Shane Parrish Style\n\nWhen examining ${prompt}, we need to apply mental models that reveal the underlying structure.\n\nFirst principles thinking shows us that:\n\n1. Complex systems have emergent properties not visible at first glance\n2. Second-order effects often dominate initial outcomes\n3. Incentives drive behavior, sometimes in counterintuitive ways\n\nThe map is not the territory. Let's explore the actual landscape.`;
    
    case 'mark-manson':
      return `# Mark Manson Style\n\nLet's be honest about ${prompt} – most of what you've heard is complete BS.\n\nHere's the uncomfortable truth: you're probably focusing on the wrong things. And that's ok! We all do it.\n\nThe real question isn't "how do I succeed at this?" but rather "why the hell do I care about this in the first place?"\n\nGive fewer f*cks about what doesn't matter, and you'll have more to give to what does.`;
    
    case 'david-perell':
      return `# David Perell Style\n\nI've been thinking about ${prompt} through the lens of information curation.\n\nInternet writing is different. It's not linear – it's networked. Here's how to approach this topic:\n\n1. Collect ideas like a researcher: observe, record, connect\n2. Share insights like a journalist: clear, concise, compelling\n3. Build knowledge like a historian: context, patterns, meaning\n\nThe best ideas emerge at the intersection of disciplines.`;
    
    default:
      return `Generated content about ${prompt}`;
  }
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [history, setHistory] = useState<Array<{prompt: string, style: string, content: string}>>([])
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Error",
        description: "Please enter a content prompt",
        variant: "destructive"
      })
      return
    }
    
    if (!style) {
      toast({
        title: "Error",
        description: "Please select a writing style",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    
    try {
      const content = await generateContent(prompt, style)
      setGeneratedContent(content)
      
      // Add to history
      setHistory(prev => [...prev, { prompt, style, content }])
      
      toast({
        title: "Success!",
        description: "Content generated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExport = () => {
    if (!generatedContent) {
      toast({
        title: "Error",
        description: "No content to export",
        variant: "destructive"
      })
      return
    }

    // Create a blob with the content and trigger a download
    const blob = new Blob([generatedContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `content-${new Date().toISOString().slice(0, 10)}.md`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Success!",
      description: "Content exported as Markdown",
    })
  }

  const styleName = WRITING_STYLES.find(s => s.id === style)?.name || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Creator Interface</h1>
          <p className="text-gray-600 mt-2">Generate content in various writing styles</p>
        </header>

        <div className="grid gap-6 grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Content</CardTitle>
              <CardDescription>Select a writing style and enter your content prompt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="style">Writing Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger id="style">
                      <SelectValue placeholder="Select a writing style" />
                    </SelectTrigger>
                    <SelectContent>
                      {WRITING_STYLES.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prompt">Content Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Enter your content prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate Content'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>{styleName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded border border-gray-200 whitespace-pre-wrap font-mono text-sm">
                  {generatedContent}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button onClick={handleExport} variant="outline">
                  Export as Markdown
                </Button>
              </CardFooter>
            </Card>
          )}

          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>Your previously generated content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-sm">{WRITING_STYLES.find(s => s.id === item.style)?.name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{item.prompt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default App