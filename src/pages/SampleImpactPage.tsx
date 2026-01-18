import React from 'react';

// Sample data representing a PM's impact logs
const SAMPLE_LOGS = [
  {
    id: '1',
    quarter: 'Q4 2025',
    date: 'Dec 15, 2025',
    title: 'Led Checkout Conversion Optimization',
    product: 'E-commerce Platform',
    description: 'Cart abandonment rate was 68%, significantly above industry average. Users were dropping off at the payment step due to friction.',
    solution: 'Redesigned the checkout flow from 5 steps to 2. Implemented Apple Pay and Google Pay. Added real-time validation and progress indicators.',
    metrics: [
      { name: 'Conversion Rate', change: '+14%', status: 'done', sentiment: 'positive' },
      { name: 'Cart Abandonment', change: '-22%', status: 'done', sentiment: 'positive' },
    ],
    teammates: ['Sarah Chen', 'Mike Rodriguez'],
    isVerified: true,
  },
  {
    id: '2',
    quarter: 'Q4 2025',
    date: 'Nov 28, 2025',
    title: 'Unblocked Q4 Platform Migration',
    product: 'Core Infrastructure',
    description: 'Engineering teams were blocked on database migration due to conflicting requirements from 4 different leads.',
    solution: 'Facilitated a 2-hour impact-mapping workshop to prioritize requirements. Created a phased rollout plan that addressed latency concerns.',
    metrics: [
      { name: 'Migration Timeline', change: 'Saved 3 weeks', status: 'done', sentiment: 'positive' },
      { name: 'Team Alignment', change: '4 leads aligned', status: 'done', sentiment: 'neutral' },
    ],
    teammates: ['James Wilson'],
    isVerified: true,
  },
  {
    id: '3',
    quarter: 'Q4 2025',
    date: 'Oct 12, 2025',
    title: 'Launched Self-Service Analytics Dashboard',
    product: 'Analytics Suite',
    description: 'Business users were filing 40+ data requests per week to the BI team, creating a 2-week backlog.',
    solution: 'Built a self-service dashboard with drag-and-drop query builder. Integrated with existing data warehouse. Added scheduled reports feature.',
    metrics: [
      { name: 'BI Requests', change: '-65%', status: 'done', sentiment: 'positive' },
      { name: 'Time to Insight', change: '2 weeks → 5 min', status: 'done', sentiment: 'positive' },
    ],
    teammates: ['Lisa Park', 'David Kim'],
    isVerified: false,
  },
  {
    id: '4',
    quarter: 'Q3 2025',
    date: 'Sep 20, 2025',
    title: 'Reduced Customer Churn with Proactive Outreach',
    product: 'Customer Success',
    description: 'Churn rate was trending upward with no early warning system. Team only discovered issues after customers cancelled.',
    solution: 'Implemented health scoring based on usage patterns. Built automated alerts for at-risk accounts. Created playbooks for CSM outreach.',
    metrics: [
      { name: 'Monthly Churn', change: '-18%', status: 'done', sentiment: 'positive' },
      { name: 'NPS Score', change: '+12 points', status: 'in_progress', sentiment: 'positive' },
    ],
    teammates: ['Amanda Foster'],
    isVerified: true,
  },
  {
    id: '5',
    quarter: 'Q3 2025',
    date: 'Aug 5, 2025',
    title: 'Mentored 2 Associate PMs on Impact Mapping',
    product: 'Team Development',
    description: 'New PMs were struggling to articulate the business value of their initiatives during stakeholder reviews.',
    solution: 'Created a 4-week mentorship program focused on outcome-driven communication. Developed templates and ran weekly coaching sessions.',
    metrics: [
      { name: 'Stakeholder Approval', change: '+40%', status: 'done', sentiment: 'positive' },
    ],
    teammates: ['Junior PM 1', 'Junior PM 2'],
    isVerified: false,
  },
];

// Group logs by quarter
const groupByQuarter = (logs: typeof SAMPLE_LOGS) => {
  const groups: Record<string, typeof SAMPLE_LOGS> = {};
  logs.forEach(log => {
    if (!groups[log.quarter]) groups[log.quarter] = [];
    groups[log.quarter].push(log);
  });
  return Object.entries(groups);
};

const SampleImpactCard = ({ log }: { log: typeof SAMPLE_LOGS[0] }) => {
  const hasInProgress = log.metrics.some(m => m.status === 'in_progress');
  
  return (
    <div className="group relative border border-divider rounded-xl overflow-hidden bg-charcoal hover:border-impact/40 transition-all duration-300">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border border-divider bg-ink">
                <svg className="w-3 h-3 mr-1.5 text-impact" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {log.date}
              </span>
              
              <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${
                hasInProgress 
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                {hasInProgress ? 'In Progress' : 'Done'}
              </span>
              
              <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border border-divider bg-ink">
                <svg className="w-3 h-3 mr-1.5 text-impact" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {log.product}
              </span>
              
              {log.isVerified && (
                <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            
            {/* Title */}
            <h3 className="font-semibold text-lg leading-tight text-primary">
              {log.title}
            </h3>
          </div>
        </div>

        {/* The Problem */}
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-muted uppercase tracking-wide">The Problem:</h4>
          <p className="text-sm text-secondary leading-relaxed">{log.description}</p>
        </div>

        {/* The Solution */}
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-muted uppercase tracking-wide">The Solution</h4>
          <p className="text-sm text-secondary leading-relaxed">{log.solution}</p>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap gap-3">
          {log.metrics.map((metric, index) => (
            <div
              key={index}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border ${
                metric.sentiment === 'positive'
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-ink border-divider'
              }`}
            >
              {metric.sentiment === 'positive' ? (
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-muted">{metric.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    metric.status === 'done'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {metric.status === 'done' ? 'Done' : 'In Progress'}
                  </span>
                </div>
                <span className={`text-sm font-semibold ${
                  metric.sentiment === 'positive' ? 'text-emerald-400' : 'text-primary'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Teammates */}
        <div className="flex items-center gap-2 pt-2 border-t border-divider/50">
          <svg className="w-4 h-4 text-impact" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <div className="flex flex-wrap gap-2">
            {log.teammates.map((teammate, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-impact/10 text-impact font-medium">
                {teammate}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SampleImpactPage = () => {
  const groupedLogs = groupByQuarter(SAMPLE_LOGS);
  
  // Calculate stats
  const inProgressCount = SAMPLE_LOGS.filter(log => 
    log.metrics.some(m => m.status === 'in_progress')
  ).length;
  const doneCount = SAMPLE_LOGS.filter(log => 
    log.metrics.every(m => m.status === 'done')
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      {/* Sample Banner */}
      <div className="mb-8 p-4 bg-impact/10 border border-impact/30 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-impact/20">
            <svg className="w-5 h-5 text-impact" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-primary">Sample Impact Page</p>
            <p className="text-xs text-secondary">This is an example of what your impact logs could look like</p>
          </div>
          <a
            href="https://dashboard.prodlog.app/auth"
            className="ml-auto bg-impact hover:opacity-90 text-white px-4 py-2 rounded text-sm font-medium transition-all"
          >
            Start Your Own
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-semibold text-primary">Impact Logs</h1>
        <p className="text-sm text-muted mt-1">
          Track your product improvements and their impact
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-charcoal border border-divider rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-500/10">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-semibold text-primary">{inProgressCount}</p>
            <p className="text-xs text-muted">In Progress</p>
          </div>
        </div>
        
        <div className="bg-charcoal border border-divider rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-500/10">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-semibold text-primary">{doneCount}</p>
            <p className="text-xs text-muted">Done</p>
          </div>
        </div>
        
        <div className="bg-charcoal border border-divider rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-impact/10">
            <svg className="w-5 h-5 text-impact" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-semibold text-primary">3</p>
            <p className="text-xs text-muted">Days Since Update</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gradient-to-b from-impact via-impact/50 to-impact/10" />
        
        <div className="space-y-6">
          {groupedLogs.map(([quarter, logs]) => (
            <div key={quarter} className="space-y-4">
              {/* Quarter header */}
              <div className="relative pl-12">
                <span className="inline-flex items-center text-sm font-semibold px-3 py-1.5 rounded-md bg-charcoal border border-impact/30 text-primary shadow-sm">
                  {quarter}
                </span>
              </div>
              
              {/* Logs in this quarter */}
              {logs.map((log) => (
                <div key={log.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-2 top-8 w-5 h-5 rounded-full border-2 border-impact bg-ink flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-impact" />
                  </div>
                  {/* Connector line */}
                  <div className="absolute left-7 top-10 w-5 h-0.5 bg-impact/50" />
                  
                  <SampleImpactCard log={log} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="text-secondary mb-6">Ready to start tracking your own impact?</p>
        <a
          href="https://dashboard.prodlog.app/auth"
          className="inline-block bg-impact hover:opacity-90 text-white px-8 py-4 rounded font-medium text-lg transition-all"
        >
          Start my impact log
        </a>
        <p className="text-muted text-sm mt-4">Free to start. No credit card required.</p>
      </div>
    </div>
  );
};
