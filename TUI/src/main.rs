use std::io;

use crossterm::{
    event::{self, Event, KeyCode, KeyEventKind, MouseButton, MouseEventKind},
    execute,
    terminal::{EnterAlternateScreen, LeaveAlternateScreen, disable_raw_mode, enable_raw_mode},
};
use ratatui::{
    Frame, Terminal,
    backend::CrosstermBackend,
    layout::{Alignment, Constraint, Direction, Layout, Rect},
    style::{Color, Modifier, Style},
    text::{Line, Span, Text},
    widgets::{Block, Borders, Paragraph},
};

const ACCENT_COLOR: Color = Color::Rgb(249, 115, 22); // Orange from rustorian gradient
const TEXT_COLOR: Color = Color::Rgb(203, 213, 225); // Slate 300
const LINK_COLOR: Color = Color::Rgb(56, 189, 248); // Light Blue

#[derive(Debug, Default)]
pub struct App {
    scroll_offset: u16,
    exit: bool,
    selected_link: usize,
    viewport_height: u16,
    link_rows: Vec<u16>,
    link_rects: Vec<Rect>,
    max_scroll: u16,
}

const LINKS: &[(&str, &str)] = &[
    ("Rustorian", "https://github.com/pie-314/Rustorian"),
    (
        "Neural Net from Scratch (C)",
        "https://github.com/pie-314/neural-network-from-scratch-c",
    ),
    ("RadishDB", "https://github.com/pie-314/radishdb"),
    ("TRX Package Manager", "https://github.com/pie-314/trx"),
    (
        "Crash-Safe Database Engine in C (Mar 2024)",
        "https://pie.hashnode.dev/how-i-built-a-crash-safe-database-engine-in-c",
    ),
    (
        "General Relativity for Kids (Oct 2024)",
        "https://physicsforkidss.blogspot.com/2024/10/general-relativity-for-kids-to.html",
    ),
    ("GitHub", "https://github.com/pie-314"),
    (
        "LinkedIn",
        "https://www.linkedin.com/in/aadarsh-chandra-70a06429b/",
    ),
    ("Twitter", "https://x.com/pie314n"),
];

fn main() -> io::Result<()> {
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen, event::EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    let app_result = App::default().run(&mut terminal);

    disable_raw_mode()?;
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        event::DisableMouseCapture
    )?;
    terminal.show_cursor()?;

    app_result
}

impl App {
    pub fn run(
        &mut self,
        terminal: &mut Terminal<CrosstermBackend<std::io::Stdout>>,
    ) -> io::Result<()> {
        while !self.exit {
            terminal.draw(|frame| self.draw(frame))?;
            self.handle_events()?;
        }
        Ok(())
    }

    fn draw(&mut self, frame: &mut Frame) {
        let area = frame.area();

        let vertical_chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([Constraint::Min(0), Constraint::Length(1)])
            .split(area);

        let horizontal_chunks = Layout::default()
            .direction(Direction::Horizontal)
            .constraints([
                Constraint::Percentage(10),
                Constraint::Percentage(80),
                Constraint::Percentage(10),
            ])
            .split(vertical_chunks[0]);

        let content_area = horizontal_chunks[1];
        self.viewport_height = content_area.height;

        let mut content = vec![];
        self.link_rows.clear();
        self.link_rects.clear();

        // Header
        content.push(Line::from(vec![
            Span::styled(
                "Aadarsh Chandra ",
                Style::default()
                    .fg(ACCENT_COLOR)
                    .add_modifier(Modifier::BOLD),
            ),
            Span::styled("[Verified Builder]", Style::default().fg(Color::Green)),
        ]));
        content.push(Line::from(Span::styled(
            "Software Developer",
            Style::default().fg(Color::DarkGray),
        )));
        content.push(Line::raw(""));

        // Bio
        content.push(Line::from(Span::styled(
            "Hey! I'm an 18-year-old self-employed developer. While I love diving",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "deep into low-level systems (C, Rust, Kernel), I'm primarily a",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "passionate learner who builds and breaks systems, robust",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "Python/Rust backends, and practical tools. I build things from first",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "principles and ship them fast.",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::raw(""));
        content.push(Line::from(Span::styled(
            "Most days you’ll find me coding to metal — blasting riffs helps me",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "lock in and keep pushing deeper. The more I learn, the more I realize",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "how much is still out there waiting. That endless curiosity is what",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "keeps it fun.",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::raw(""));
        content.push(Line::raw(""));

        // Experience
        content.push(Line::from(Span::styled(
            "== Experience ==",
            Style::default()
                .fg(ACCENT_COLOR)
                .add_modifier(Modifier::BOLD),
        )));
        content.push(Line::raw(""));
        content.push(Line::from(vec![
            Span::styled(
                "Independent Developer ",
                Style::default().add_modifier(Modifier::BOLD),
            ),
            Span::styled("(Self-Employed) ", Style::default().fg(Color::DarkGray)),
            Span::styled("[Present]", Style::default().fg(Color::Yellow)),
        ]));
        content.push(Line::from(Span::styled(
            "  • Working as a self-employed dev, building end-to-end applications.",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "  • Developing full-stack web apps and robust Python APIs.",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "  • Building high-performance backend systems and CLIs in Rust.",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::from(Span::styled(
            "  • Continuously exploring low-level systems (C, Kernel development).",
            Style::default().fg(TEXT_COLOR),
        )));
        content.push(Line::raw(""));
        content.push(Line::raw(""));

        // Projects
        content.push(Line::from(Span::styled(
            "== Projects ==",
            Style::default()
                .fg(ACCENT_COLOR)
                .add_modifier(Modifier::BOLD),
        )));
        content.push(Line::raw(""));
        for i in 0..4 {
            let (name, _url) = LINKS[i];
            self.link_rows.push(content.len() as u16);
            let link_len = name.chars().count() as u16 + 2;
            self.link_rects.push(Rect::new(0, 0, link_len, 1));

            let style = if self.selected_link == i {
                Style::default()
                    .bg(LINK_COLOR)
                    .fg(Color::Black)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default().fg(LINK_COLOR).add_modifier(Modifier::BOLD)
            };

            content.push(Line::from(vec![
                Span::styled("➔ ", Style::default().fg(Color::DarkGray)),
                Span::styled(name, style),
            ]));

            let desc = match i {
                0 => "  A Rust-based Async Historian with monthly SQLite rotation.",
                1 => "  Forward & backprop logic in raw C, zero abstractions.",
                2 => "  A highly-optimized, crash-safe storage engine built in C.",
                3 => "  A blazing fast terminal-native package manager (Ratatui).",
                _ => "",
            };
            content.push(Line::from(Span::styled(
                desc,
                Style::default().fg(TEXT_COLOR),
            )));
            content.push(Line::raw(""));
        }
        content.push(Line::raw(""));

        // Heatmap
        content.push(Line::from(Span::styled(
            "== GitHub Activity ==",
            Style::default()
                .fg(ACCENT_COLOR)
                .add_modifier(Modifier::BOLD),
        )));
        content.push(Line::raw(""));
        let cols = (content_area.width.saturating_sub(6) / 2).min(52) as usize;
        let c0 = Color::Rgb(22, 27, 34);
        let c1 = Color::Rgb(14, 68, 41);
        let c2 = Color::Rgb(0, 109, 50);
        let c3 = Color::Rgb(38, 166, 65);
        let c4 = Color::Rgb(57, 211, 83);
        for y in 0..7 {
            let mut spans = vec![];
            let label = match y {
                1 => "Mon ",
                3 => "Wed ",
                5 => "Fri ",
                _ => "    ",
            };
            spans.push(Span::styled(label, Style::default().fg(Color::DarkGray)));
            for x in 0..cols {
                let color = match (x * 7 + y) % 17 {
                    0..=3 => c0,
                    4..=8 => c1,
                    9..=12 => c2,
                    13..=15 => c3,
                    _ => c4,
                };
                spans.push(Span::styled("■ ", Style::default().fg(color)));
            }
            content.push(Line::from(spans));
        }
        content.push(Line::raw(""));
        content.push(Line::raw(""));

        // Blogs
        content.push(Line::from(Span::styled(
            "== Blogs ==",
            Style::default()
                .fg(ACCENT_COLOR)
                .add_modifier(Modifier::BOLD),
        )));
        content.push(Line::raw(""));
        for i in 4..6 {
            let (name, _url) = LINKS[i];
            self.link_rows.push(content.len() as u16);
            let link_len = name.chars().count() as u16 + 2;
            self.link_rects.push(Rect::new(0, 0, link_len, 1));

            let style = if self.selected_link == i {
                Style::default()
                    .bg(LINK_COLOR)
                    .fg(Color::Black)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default().fg(LINK_COLOR).add_modifier(Modifier::BOLD)
            };
            content.push(Line::from(vec![
                Span::styled("➔ ", Style::default().fg(Color::DarkGray)),
                Span::styled(name, style),
            ]));

            let desc = match i {
                4 => "  Write-Ahead Logs, data persistence, and C architecture.",
                5 => "  Distilling complex physics concepts into accessible mental models.",
                _ => "",
            };
            content.push(Line::from(Span::styled(
                desc,
                Style::default().fg(TEXT_COLOR),
            )));
            content.push(Line::raw(""));
        }
        content.push(Line::raw(""));

        // Social
        content.push(Line::from(Span::styled(
            "== Social ==",
            Style::default()
                .fg(ACCENT_COLOR)
                .add_modifier(Modifier::BOLD),
        )));
        content.push(Line::raw(""));
        for i in 6..LINKS.len() {
            let (name, _url) = LINKS[i];
            self.link_rows.push(content.len() as u16);
            let link_len = name.chars().count() as u16 + 2;
            self.link_rects.push(Rect::new(0, 0, link_len, 1));

            let style = if self.selected_link == i {
                Style::default()
                    .bg(LINK_COLOR)
                    .fg(Color::Black)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default().fg(LINK_COLOR).add_modifier(Modifier::BOLD)
            };
            content.push(Line::from(vec![
                Span::styled("➔ ", Style::default().fg(Color::DarkGray)),
                Span::styled(name, style),
            ]));
            content.push(Line::raw(""));
        }

        self.max_scroll = content.len().saturating_sub(1) as u16;
        if self.scroll_offset > self.max_scroll {
            self.scroll_offset = self.max_scroll;
        }

        for (i, row) in self.link_rows.iter().enumerate() {
            let screen_y = content_area.y as i32 + *row as i32 - self.scroll_offset as i32;
            if screen_y >= content_area.y as i32
                && screen_y < (content_area.y + content_area.height) as i32
            {
                self.link_rects[i].x += content_area.x;
                self.link_rects[i].y = screen_y as u16;
            } else {
                self.link_rects[i] = Rect::default();
            }
        }

        let text_block = Text::from(content);
        let paragraph = Paragraph::new(text_block)
            .block(Block::default().borders(Borders::NONE))
            .scroll((self.scroll_offset, 0));

        frame.render_widget(paragraph, content_area);

        let footer = Paragraph::new(Line::from(vec![Span::styled(
            "↑/↓ or Mouse Wheel: scroll | Tab/S-Tab: cycle links | Enter/Click: open | q: quit",
            Style::default().fg(Color::DarkGray),
        )]))
        .alignment(Alignment::Center);
        frame.render_widget(footer, vertical_chunks[1]);
    }

    fn handle_events(&mut self) -> io::Result<()> {
        match event::read()? {
            Event::Key(key) => {
                if key.kind == KeyEventKind::Press {
                    match key.code {
                        KeyCode::Down | KeyCode::Char('j') => {
                            if self.scroll_offset + self.viewport_height < self.max_scroll + 1 {
                                self.scroll_offset += 1;
                            }
                        }
                        KeyCode::Up | KeyCode::Char('k') => {
                            self.scroll_offset = self.scroll_offset.saturating_sub(1);
                        }
                        KeyCode::Tab => {
                            self.selected_link = (self.selected_link + 1) % LINKS.len();
                            self.ensure_selected_visible();
                        }
                        KeyCode::BackTab => {
                            if self.selected_link == 0 {
                                self.selected_link = LINKS.len() - 1;
                            } else {
                                self.selected_link -= 1;
                            }
                            self.ensure_selected_visible();
                        }
                        KeyCode::Enter => {
                            self.open_selected_link();
                        }
                        KeyCode::Char('q') | KeyCode::Char('Q') | KeyCode::Esc => {
                            self.exit = true;
                        }
                        _ => {}
                    }
                }
            }
            Event::Mouse(mouse) => {
                if mouse.kind == MouseEventKind::Down(MouseButton::Left) {
                    for (i, rect) in self.link_rects.iter().enumerate() {
                        if rect.x <= mouse.column
                            && mouse.column < rect.x + rect.width
                            && rect.y <= mouse.row
                            && mouse.row < rect.y + rect.height
                        {
                            self.selected_link = i;
                            self.open_selected_link();
                            break;
                        }
                    }
                } else if mouse.kind == MouseEventKind::ScrollDown {
                    if self.scroll_offset + self.viewport_height < self.max_scroll + 1 {
                        self.scroll_offset += 3;
                        if self.scroll_offset + self.viewport_height > self.max_scroll + 1 {
                            self.scroll_offset = self.max_scroll + 1 - self.viewport_height;
                        }
                    }
                } else if mouse.kind == MouseEventKind::ScrollUp {
                    self.scroll_offset = self.scroll_offset.saturating_sub(3);
                }
            }
            _ => {}
        }
        Ok(())
    }

    fn ensure_selected_visible(&mut self) {
        if self.selected_link < self.link_rows.len() {
            let target_row = self.link_rows[self.selected_link];
            // Provide a margin of 1 line when scrolling automatically to show context
            if target_row < self.scroll_offset {
                self.scroll_offset = target_row.saturating_sub(1);
            } else if target_row >= self.scroll_offset + self.viewport_height {
                self.scroll_offset = target_row.saturating_sub(self.viewport_height - 2);
            }
        }
    }

    fn open_selected_link(&self) {
        if let Some(url) = LINKS.get(self.selected_link).map(|(_, u)| u) {
            let _ = std::process::Command::new("xdg-open").arg(url).output();
        }
    }
}
