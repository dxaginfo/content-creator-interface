import { useState } from 'react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import { Toaster } from './components/ui/toaster';
import { useToast } from './components/ui/use-toast';

// Writer style templates
const writerStyles = {
  'tim-ferriss': {
    name: 'Super Writer GPT (Tim Ferriss Style)',
    description: 'Clear, concise writing with tactical advice and personal anecdotes',
  },
  'tim-ferriss-james-clear': {
    name: 'Super Writer GPT (Tim Ferriss Style) + James Clear (20%)',
    description: 'Tim Ferriss style with James Clear\'s emphasis on habits and systems',
  },
  'shane-parrish': {
    name: 'Insight Writer GPT (Shane Parrish Style)',
    description: 'Mental models and deep analytical thinking',
  },
  'mark-manson': {
    name: 'Brutally Honest GPT (Mark Manson Style)',
    description: 'No-nonsense approach with direct, sometimes profane language',
  },
  'david-perell': {
    name: 'Idea Curator GPT (David Perell Style)',
    description: 'Connection of ideas across domains with storytelling elements',
  },
};

// Sample content generator function (in a real app, this would call an API)
const generateContent = (style: string, prompt: string) => {
  const styleInfo = writerStyles[style as keyof typeof writerStyles];
  
  // Placeholder text - this would be replaced with actual API calls
  const contentSamples = {
    'tim-ferriss': `# ${prompt}\n\nI've been thinking about this topic for years, and I've tested dozens of approaches. Here's what actually works...\n\nFirst, let's break this down into actionable steps:\n\n1. **Start small** - Begin with just two minutes per day. This removes the activation energy needed to start.\n\n2. **Use environmental triggers** - I keep a reminder object on my desk that serves as a constant cue.\n\n3. **Track everything** - What gets measured gets managed. I use a simple spreadsheet (template linked below).\n\nI learned this framework from [expert's name], who's been studying this field for over 20 years. When I implemented this in my own life, I saw results within just 11 days.\n\nThe biggest mistake people make? They try to change too much at once. As my friend [famous person] often says, "The magnitude of the life outcome you experience is directly proportional to how many uncomfortable conversations you're willing to have."\n\nTry this exact protocol for just one week. The ROI will surprise you.`,
    
    'tim-ferriss-james-clear': `# ${prompt}\n\nI've been obsessed with this question for years.\n\nAfter interviewing hundreds of world-class performers, I've found a pattern that works consistently - and it's simpler than you might expect.\n\nHere's the framework:\n\n1. **Make it obvious** - Place visual cues in your environment that trigger the desired behavior\n\n2. **Make it attractive** - Pair it with something you already enjoy\n\n3. **Make it easy** - Reduce friction; start with a "two-minute version"\n\n4. **Make it satisfying** - Create immediate rewards for completion\n\nMy friend James Clear calls this "habit stacking," and it's remarkably effective.\n\nThe key insight: You don't rise to the level of your goals; you fall to the level of your systems.\n\nI've personally tested this approach with [specific example], and the results were immediate: [specific outcome].\n\nRemember: Small habits compound over time. A 1% improvement each day makes you 37 times better after a year.\n\nWhat tiny habit could you start tomorrow?`,
    
    'shane-parrish': `# ${prompt}\n\nThis question touches on a fascinating mental model worth exploring.\n\nTo understand this properly, we need to consider several layers:\n\n## First Principles Analysis\n\nWhen we break this down to fundamentals, we find three core mechanisms at work:\n\n1. **Inversion**: Rather than asking what actions lead to success, ask what guarantees failure and avoid those paths\n\n2. **Opportunity Costs**: Every choice allocates finite resources and precludes alternative investments\n\n3. **Feedback Loops**: Initial conditions create self-reinforcing systems that amplify over time\n\n## Historical Patterns\n\nStudying exemplars across domains reveals consistent patterns:\n\n- Charlie Munger approaches this by using a latticework of mental models\n- Richard Feynman relied on first-principles thinking\n- [Historical figure] demonstrated that [specific insight]\n\nThe second-order effects here are particularly noteworthy. While most focus on immediate outcomes, the true leverage comes from understanding how initial conditions create cascading consequences.\n\nAs Munger wisely notes: "To the man with only a hammer, every problem looks like a nail." Expanding your mental toolbox is the meta-skill that improves all others.\n\nWhat mental models might you be overlooking?`,
    
    'mark-manson': `# ${prompt}\n\nLet's cut the bullshit and talk about what everyone thinks but nobody says.\n\nThe uncomfortable truth? Most people fail at this because:\n\n1. They care too much about what others think\n2. They avoid the hard conversations\n3. They're addicted to their own problems\n\nHere's the thing: life is short, and you're going to die. Sorry if that's a buzzkill, but ignoring that fact is why most people waste their limited time on this planet.\n\nThe paradox is that giving fewer fucks about the trivial things allows you to give more fucks about what truly matters.\n\nMost "life advice" is feel-good garbage designed to sell books and seminars. The reality? Growth requires discomfort. Period.\n\nI spent years chasing [specific goal] before realizing I was optimizing for other people's definition of success. What a waste of time.\n\nThe million-dollar question isn't "How can I be successful?" but rather "What flavor of shit sandwich am I willing to eat?" Because every path has its own variety of pain.\n\nChoose wisely.`,
    
    'david-perell': `# ${prompt}\n\nI've been collecting ideas on this topic for years, connecting threads across history, business, and art.\n\nHere's what I've discovered:\n\nGreat [topic] emerges at the intersection of three forces:\n\n1. **Information Compounding**: Like Darwin collecting specimens for decades before his eureka moment, insights accumulate gradually until a breakthrough appears suddenly\n\n2. **Idea Arbitrage**: Taking concepts from one domain and applying them to another creates innovation at the edges\n\n3. **Narrative Resonance**: The ideas that spread are wrapped in stories that connect to our shared humanity\n\nConsider how Ernest Hemingway's journalism career shaped his distinct writing style: economical prose forged through writing telegraph dispatches, where every word cost money.\n\nOr how Walt Disney's childhood in rural Missouri influenced his vision for Main Street USA.\n\nI call this "idea sex" - when concepts from different domains combine to create something entirely new.\n\nThe Renaissance happened because people were polymathic, drawing connections between seemingly unrelated fields.\n\nWhat domains could you connect that nobody else is combining?\n\nStart a Personal Idea Bank. Capture one insight daily. Watch as connections emerge over time, revealing patterns invisible to the specialist.`,
  };
  
  return contentSamples[style as keyof typeof contentSamples] || 'Content could not be generated. Please try a different style.';
};

function App() {
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [history, setHistory] = useState<Array<{style: string, prompt: string, content: string}>>([]);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!selectedStyle) {
      toast({
        title: 'Style not selected',
        description: 'Please select a writing style first.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!prompt.trim()) {
      toast({
        title: 'Empty prompt',
        description: 'Please enter a prompt to generate content.',
        variant: 'destructive',
      });
      return;
    }
    
    const content = generateContent(selectedStyle, prompt);
    setGeneratedContent(content);
    
    // Add to history
    setHistory(prev => [
      { style: selectedStyle, prompt, content },
      ...prev
    ]);
    
    toast({
      title: 'Content generated',
      description: `Created using ${writerStyles[selectedStyle as keyof typeof writerStyles]?.name}`,
    });
  };

  const handleExport = () => {
    if (!generatedContent) {
      toast({
        title: 'Nothing to export',
        description: 'Generate content first before exporting.',
        variant: 'destructive',
      });
      return;
    }
    
    // Create a blob and download it
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.substring(0, 20).replace(/\W+/g, '-').toLowerCase()}-${selectedStyle}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Content exported',
      description: 'Your content has been downloaded as a Markdown file.',
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Toaster />
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Content Creator Interface</h1>
          <p className="text-muted-foreground">Generate content in various writing styles</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Writing Style</label>
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a style" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(writerStyles).map(([key, { name, description }]) => (
                    <SelectItem key={key} value={key}>
                      <div>
                        <div>{name}</div>
                        <div className="text-xs text-muted-foreground">{description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Prompt</label>
              <Textarea 
                placeholder="Enter your content prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleGenerate} className="flex-1">
                Generate
              </Button>
              <Button onClick={handleExport} variant="outline" className="flex-1">
                Export
              </Button>
            </div>
            
            {history.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">History</h3>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {history.map((item, index) => (
                    <div 
                      key={index} 
                      className="text-xs p-2 border rounded cursor-pointer hover:bg-accent"
                      onClick={() => {
                        setSelectedStyle(item.style);
                        setPrompt(item.prompt);
                        setGeneratedContent(item.content);
                      }}
                    >
                      <div className="font-medium">{writerStyles[item.style as keyof typeof writerStyles]?.name}</div>
                      <div className="truncate">{item.prompt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="md:col-span-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Generated Content</h3>
                {selectedStyle && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {writerStyles[selectedStyle as keyof typeof writerStyles]?.name}
                  </span>
                )}
              </div>
              <div className="min-h-[500px] p-4 border rounded bg-card">
                {generatedContent ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans">{generatedContent}</pre>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Select a style and enter a prompt to generate content
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;