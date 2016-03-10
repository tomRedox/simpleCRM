import React from 'react';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createDevTools } from 'redux-devtools';

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    // Docs: https://github.com/gaearon/redux-devtools-dock-monitor
    <DockMonitor
        toggleVisibilityKey='ctrl-q'
        changePositionKey='ctrl-i'
        defaultIsVisible={false}
    >
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
);

export default DevTools;